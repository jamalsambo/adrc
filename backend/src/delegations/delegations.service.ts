/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateDelegationDto } from './dto/create-delegation.dto';
import { UpdateDelegationDto } from './dto/update-delegation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DelegationEntity } from './entities/delegation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DelegationsService {
  constructor(
    @InjectRepository(DelegationEntity)
    private readonly delegationRepository: Repository<DelegationEntity>,
  ) {}
  async create(createDelegationDto: CreateDelegationDto) {
    return await this.delegationRepository.save(createDelegationDto)
  }
  async findAll() {
    return await this.delegationRepository.find()
  }

  async findOne(id: string) {
    return await this.delegationRepository.findOne({ where: {id: id}})
  }

  async update(id: string, updateDelegationDto: UpdateDelegationDto) {
    const delegation = await this.delegationRepository.findOne({ where: { id: id}})
    this.delegationRepository.merge(delegation, updateDelegationDto)
    return await this.delegationRepository.save(delegation)
  }
}
