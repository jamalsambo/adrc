/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProvinceEntity } from './entities/province.entity';
import { Repository } from 'typeorm';
import { DistrictEntity } from './entities/distrctit.entity';
import { ZoneEntity } from './entities/zone.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(ProvinceEntity)
    private readonly provinceRepo: Repository<ProvinceEntity>,

    @InjectRepository(DistrictEntity)
    private readonly districtRepo: Repository<DistrictEntity>,

    @InjectRepository(ZoneEntity)
    private readonly zoneRepo: Repository<ZoneEntity>,
  ) {}

  async findProvince() {
    return await this.provinceRepo.find();
  }

  async findDistrict() {
    return await this.districtRepo.find();
  }

  async findZone() {
    return await this.zoneRepo.find();
  }
}
