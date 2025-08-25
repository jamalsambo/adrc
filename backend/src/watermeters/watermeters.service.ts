/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWatermeterDto } from './dto/create-watermeter.dto';
import { UpdateWatermeterDto } from './dto/update-watermeter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WatermeterEntity } from './entities/watermeter.entity';
import { FindOneOptions, FindOptionsWhere, IsNull, Not, Repository } from 'typeorm';
import { EmployeeHasZoneEntity } from 'src/employees/entities/has-zones.entity';
import { InspectionHasWatermeter } from 'src/inspections/entities/has-watermeter.entity';

@Injectable()
export class WatermetersService {
  constructor(
    @InjectRepository(WatermeterEntity)
    private readonly watermeterRespository: Repository<WatermeterEntity>,

    @InjectRepository(EmployeeHasZoneEntity)
    private readonly employeeHasZoneRepo: Repository<EmployeeHasZoneEntity>,

    @InjectRepository(InspectionHasWatermeter)
    private readonly employeeHasWatermeterRepo: Repository<InspectionHasWatermeter>,
  ) { }
  async create(createWatermeterDto: CreateWatermeterDto) {
    return await this.watermeterRespository.save(createWatermeterDto);
  }

  async findAll(limit?: number) {
    return await this.watermeterRespository.find({
      relations: ['zone', 'hasCustomers'],
      take: limit,
      order: {
        createdAt: 'DESC', // 🔹 do mais recente para o mais antigo
      },
    });
  }

  async findOneOrFail(
    conditions: FindOptionsWhere<WatermeterEntity>,
    options?: FindOneOptions<WatermeterEntity>,
  ) {
    try {
      const user = await this.watermeterRespository.findOneOrFail({
        where: conditions,
        relations: ['zone', 'hasCustomers', 'hasCustomers.customer', 'readings'],
        ...options,
      });

      return user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('hidrómetro nao encontrado'); // Mensagem de erro mais clara
    }
  }

  async update(id: string, updateWatermeterDto: UpdateWatermeterDto) {
    const watermeter = await this.watermeterRespository.findOne({
      where: { id: id },
    });
    this.watermeterRespository.merge(watermeter, updateWatermeterDto);
    return await this.watermeterRespository.save(watermeter);
  }

  async remove(id: string) {
    await this.watermeterRespository.delete(id);
  }

  async distributeWatermetersToEmployees(inspectionId: string) {
    const watermeters = await this.watermeterRespository.find({
      where: {
        zoneId: Not(IsNull()),
        block: Not(IsNull()),
        status: 'Activo'
      },
    });

    // 2. Agrupar por zona e block
    const groupedByZoneAndBlock = new Map<string, Map<any, any[]>>();
    for (const wm of watermeters) {
      if (!groupedByZoneAndBlock.has(wm.zoneId)) {
        groupedByZoneAndBlock.set(wm.zoneId, new Map<string, any[]>());
      }

      const blockMap = groupedByZoneAndBlock.get(wm.zoneId);
      if (!blockMap.has(wm.block)) {
        blockMap.set(wm.block, []);
      }
      blockMap.get(wm.block).push(wm);
    }

    const assignments = [];

    // 3. Para cada zona
    for (const [zoneId, blockMap] of groupedByZoneAndBlock.entries()) {
      // Buscar funcionários da zona
      const employeesInZone = await this.employeeHasZoneRepo.find({
        where: { zoneId },
      });

      const employeeIds = employeesInZone.map((e) => e.employeeId);
      if (employeeIds.length === 0) continue;

      let index = 0;

      // 4. Para cada block dentro da zona
      for (const [blockId, blockWatermeters] of blockMap.entries()) {
        // Escolher um funcionário para o block inteiro
        const employeeId = employeeIds[index % employeeIds.length];

        for (const wm of blockWatermeters) {
          assignments.push({
            employeeId,
            watermeterId: wm.id,
            inspectionId,
            inspection: false,
          });
        }

        index++;
      }
    }

    // 4. Salvar os registros (ex: na tabela employee_has_watermeters)
    await this.employeeHasWatermeterRepo.save(assignments);

    return {
      message: 'Distribuição concluída com sucesso.',
      total: assignments.length,
    };
  }
}
