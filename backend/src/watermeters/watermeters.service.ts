/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWatermeterDto } from './dto/create-watermeter.dto';
import { UpdateWatermeterDto } from './dto/update-watermeter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WatermeterEntity } from './entities/watermeter.entity';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
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
  ) {}
  async create(createWatermeterDto: CreateWatermeterDto) {
    return await this.watermeterRespository.save(createWatermeterDto);
  }

  async findAll() {
    return await this.watermeterRespository.find({
      relations: ['zone', 'hasCustomers']
    });
  }

  async findOneOrFail(
    conditions: FindOptionsWhere<WatermeterEntity>,
    options?: FindOneOptions<WatermeterEntity>,
  ) {
    try {
      const user = await this.watermeterRespository.findOneOrFail({
        where: conditions,
        relations: ['zone', 'hasCustomers', 'hasCustomers.customer'],
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
    // 1. Obter todos os watermeters com zona atribuída
    const watermeters = await this.watermeterRespository.find();

    // 2. Agrupar watermeters por zona
    const groupedByZone = new Map<string, any[]>();
    for (const wm of watermeters) {
      if (!groupedByZone.has(wm.zoneId)) {
        groupedByZone.set(wm.zoneId, []);
      }
      groupedByZone.get(wm.zoneId).push(wm);
    }

    const assignments = [];

    // 3. Para cada zona, buscar funcionários e distribuir watermeters
    for (const [zoneId, zoneWatermeters] of groupedByZone.entries()) {
      // Buscar funcionários da zona
      const employeesInZone = await this.employeeHasZoneRepo.find({
        where: { zoneId },
      });

      const employeeIds = employeesInZone.map((e) => e.employeeId);
      if (employeeIds.length === 0) continue;

      // Distribuir de forma equitativa
      let index = 0;
      for (const wm of zoneWatermeters) {
        const employeeId = employeeIds[index % employeeIds.length];

        assignments.push({
          employeeId,
          watermeterId: wm.id,
          inspectionId,
          inspection: false,
        });

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
