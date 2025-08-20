/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnomalyDto } from './dto/create-anomaly.dto';
import { UpdateAnomalyDto } from './dto/update-anomaly.dto';
import { AnomalyEntity } from './entities/anomaly.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class AnomaliesService {
  constructor(
    @InjectRepository(AnomalyEntity)
    private readonly anomalyRepo: Repository<AnomalyEntity>,
  ) {}

  async generateAnomalyCode(): Promise<string> {
    const last = await this.anomalyRepo
      .createQueryBuilder('a')
      .orderBy('a.code', 'DESC')
      .getOne();

    let nextNumber = 1;

    if (last?.code) {
      const lastCodeNumber = parseInt(last.code.replace('AN-', ''), 10);
      if (!isNaN(lastCodeNumber)) {
        nextNumber = lastCodeNumber + 1;
      }
    }

    const padded = String(nextNumber).padStart(4, '0');
    return `AN-${padded}`;
  }
  async create(createAnomalyDto: CreateAnomalyDto) {
    const code = await this.generateAnomalyCode();
    const anomaly = this.anomalyRepo.create({
      ...createAnomalyDto,
      code,
    });
    return this.anomalyRepo.save(anomaly);
  }

  async findAll() {
    return await this.anomalyRepo.find();
  }

  async findOneOrFail(
    conditions: FindOptionsWhere<AnomalyEntity>,
    options?: FindOneOptions<AnomalyEntity>,
  ) {
    try {
      const user = await this.anomalyRepo.findOneOrFail({
        where: conditions,
        ...options,
      });

      return user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('Funcionjario nao encontrado'); // Mensagem de erro mais clara
    }
  }

  async update(id: string, updateAnomalyDto: UpdateAnomalyDto) {
    const anomaly = await this.anomalyRepo.findOne({ where: { id: id } });
    this.anomalyRepo.merge(anomaly, updateAnomalyDto);
    return await this.anomalyRepo.save(anomaly);
  }
}
