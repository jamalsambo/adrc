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
  ) {}
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

  async findAll() {
    return await this.inspectionRepo.find({
      relations: ['type'],
    });
  }

  async findOneOrFail(
    conditions: FindOptionsWhere<InspectionEntity>,
    options?: FindOneOptions<InspectionEntity>,
  ) {
    try {
      const user = await this.inspectionRepo.findOneOrFail({
        where: conditions,
        ...options,
      });

      return user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('Inspensão nao encontrada'); // Mensagem de erro mais clara
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
