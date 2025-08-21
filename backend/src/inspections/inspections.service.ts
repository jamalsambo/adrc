/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInspectionDto } from './dto/create-inspection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InspectionEntity } from './entities/inspection.entity';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { InspectionTypesEntity } from './entities/type.entity';
import { InspectionHasWatermeter } from './entities/has-watermeter.entity';

@Injectable()
export class InspectionsService {
  constructor(
    @InjectRepository(InspectionEntity)
    private readonly inspectionRepo: Repository<InspectionEntity>,

    @InjectRepository(InspectionTypesEntity)
    private readonly inspectionTypeRepo: Repository<InspectionTypesEntity>,

    @InjectRepository(InspectionHasWatermeter)
    private readonly inspeHasWatermeterRepo: Repository<InspectionHasWatermeter>,
  ) { }

  async findAll(employeeId?: string, limit?: number) {
    const qb = this.inspectionRepo
      .createQueryBuilder('inspection')
      .leftJoin('inspection.hasWatermeters', 'hasWatermeters')
      .orderBy('inspection.createdAt', 'DESC'); // 🔹 mais recentes primeiro

    if (employeeId) {
      // 🔹 Caso tenha employeeId → filtra e conta só desse funcionário
      qb.where('hasWatermeters.employeeId = :employeeId', { employeeId })
        .loadRelationCountAndMap(
          'inspection.watermetersCount',
          'inspection.hasWatermeters',
          'wm',
          qb => qb.where('wm.employeeId = :employeeId', { employeeId })
        );
    } else {
      // 🔹 Caso não tenha employeeId → traz todos e conta geral
      qb.loadRelationCountAndMap(
        'inspection.watermetersCount',
        'inspection.hasWatermeters'
      );
    }

    if (limit) {
      qb.take(limit); // 🔹 limita a quantidade de registros
    }

    return qb.getMany();
  }

  async generateInspectionNumber(): Promise<string> {
    const last = await this.inspectionRepo
      .createQueryBuilder('i')
      .orderBy('i.number', 'DESC')
      .getOne();

    let nextNumber = 1;

    if (last?.number) {
      const lastNumber = parseInt(last.number.replace('IN-', ''), 10);
      if (!isNaN(lastNumber)) {
        nextNumber = lastNumber + 1;
      }
    }

    return `IN-${String(nextNumber).padStart(5, '0')}`;
  }

  async create(createDto: CreateInspectionDto) {
    const number = await this.generateInspectionNumber();
    const month = new Date().toLocaleString('pt-BR', {
      month: 'long',
    });

    const inspection = this.inspectionRepo.create({
      ...createDto,
      number,
      month,
    });

    return this.inspectionRepo.save(inspection);
  }

async findOneOrFail(
  conditions: FindOptionsWhere<InspectionEntity>,
  employeeId?: string, // 🔹 novo parâmetro opcional
  options?: FindOneOptions<InspectionEntity>,
) {
  try {
    const qb = this.inspectionRepo
      .createQueryBuilder('inspection')
      .leftJoinAndSelect('inspection.hasWatermeters', 'hasWatermeters')
      .leftJoinAndSelect('hasWatermeters.watermeter', 'watermeter')
      .leftJoinAndSelect('watermeter.zone', 'zone')
      .leftJoinAndSelect('hasWatermeters.employee', 'employee');

    // 🔹 Adiciona condições gerais
    Object.keys(conditions).forEach((key, index) => {
      const paramName = `param${index}`;
      qb.andWhere(`inspection.${key} = :${paramName}`, { [paramName]: (conditions as any)[key] });
    });

    // 🔹 Filtra por employeeId se fornecido
    if (employeeId) {
      qb.andWhere('hasWatermeters.employeeId = :employeeId', { employeeId })
        .loadRelationCountAndMap(
          'inspection.watermetersCount',
          'inspection.hasWatermeters',
          'wm',
          qb => qb.where('wm.employeeId = :employeeId', { employeeId })
        );
    } else {
      // 🔹 Caso não tenha employeeId → conta todos
      qb.loadRelationCountAndMap(
        'inspection.watermetersCount',
        'inspection.hasWatermeters'
      );
    }

    // 🔹 Aplica opções extras como order
    if (options?.order) {
      Object.entries(options.order).forEach(([field, direction]) => {
        qb.addOrderBy(`inspection.${field}`, direction as 'ASC' | 'DESC');
      });
    }

    const inspection = await qb.getOne();

    if (!inspection) {
      throw new NotFoundException('Inspeção não encontrada');
    }

    return inspection;
  } catch (error) {
    throw new NotFoundException('Inspeção não encontrada');
  }
}


  async remove(id: string): Promise<void> {
    await this.inspectionRepo.delete(id);
  }

  async findTypes() {
    return await this.inspectionTypeRepo.find();
  }

  async findWatermeter(inspectionId: string) {
    return await this.inspeHasWatermeterRepo.find({
      where: { inspectionId: inspectionId },
      relations: ['watermeter', 'watermeter.zone', 'employee']
    });
  }

}
