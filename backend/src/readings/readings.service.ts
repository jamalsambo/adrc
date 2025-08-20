/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReadingDto } from './dto/create-reading.dto';
import { UpdateReadingDto } from './dto/update-reading.dto';
import { ReadingEntity } from './entities/reading.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { TypeReadingsEntity } from './entities/type.entity';

@Injectable()
export class ReadingsService {
  constructor(
    @InjectRepository(ReadingEntity)
    private readonly readingRepo: Repository<ReadingEntity>,

    @InjectRepository(TypeReadingsEntity)
    private readonly typeReadingRepo: Repository<TypeReadingsEntity>,
  ) {}

  async generateReadingNumber(): Promise<string> {
    const lastReading = await this.readingRepo
      .createQueryBuilder('r')
      .orderBy('r.number', 'DESC')
      .getOne();

    let nextNumber = 1;

    if (lastReading?.number) {
      const lastNumber = parseInt(lastReading.number.replace('RD-', ''), 10);
      if (!isNaN(lastNumber)) {
        nextNumber = lastNumber + 1;
      }
    }

    const padded = String(nextNumber).padStart(5, '0');
    return `RD-${padded}`;
  }

  async create(createReadingDto: CreateReadingDto) {
    const number = await this.generateReadingNumber();

    const reading = this.readingRepo.create({
      ...createReadingDto,
      number,
    });

    return this.readingRepo.save(reading);
  }

  async findAll() {
    const reading = await this.readingRepo
      .createQueryBuilder('r')
      .leftJoin('r.watermeter', 'w')
      .leftJoin('r.customer', 'c')
      .leftJoin('r.type', 't')
      .leftJoin('r.anomaly', 'a')
      .leftJoin('r.reader', 'rd')
      .leftJoin('r.inspection', 'i')
      .select([
        'r.id',
        'r.number',
        'r.reading',
        'w.number',
        'c.fullName',
        't.name',
        'a.code',
        'a.name',
        'rd.displayName',
        'i.number',
      ])
      .getMany();

    return reading;
  }

  async findOneOrFail(conditions: FindOptionsWhere<ReadingEntity>) {
    try {
      const reading = await this.readingRepo
        .createQueryBuilder('r')
        .leftJoin('r.watermeter', 'w')
        .leftJoin('r.customer', 'c')
        .leftJoin('r.type', 't')
        .leftJoin('r.anomaly', 'a')
        .leftJoin('r.reader', 'rd')
        .leftJoin('r.inspection', 'i')
        .select([
          'r.id',
          'r.number',
          'r.reading',
          'w.number',
          'c.fullName',
          't.name',
          'a.code',
          'a.name',
          'rd.displayName',
          'i.number',
        ])
        .where('r.id = :id', { id: (conditions as any).id }) // adapte conforme
        .getOneOrFail();

      return reading;
    } catch {
      throw new NotFoundException('Leitura não encontrada');
    }
  }

  async update(id: string, updateReadingDto: UpdateReadingDto) {
    const reading = await this.readingRepo.findOne({ where: { id: id } });
    this.readingRepo.merge(reading, updateReadingDto);
    return await this.readingRepo.save(reading);
  }

  async remove(id: string): Promise<void> {
    await this.readingRepo.delete(id);
  }

  async findAllType() {
    return await this.typeReadingRepo.find();
  }
}
