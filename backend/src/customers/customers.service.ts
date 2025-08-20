/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { CreateCustomerHasWatermeterDto } from './dto/create-customer-has-watermeter.dto';
import { CustomerHasWatermeterEntity } from './entities/has-watermeter.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,

    @InjectRepository(CustomerHasWatermeterEntity)
    private readonly customerHasWatermeterRepo: Repository<CustomerHasWatermeterEntity>,
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    return await this.customerRepository.save(createCustomerDto);
  }

  async findAll() {
    return await this.customerRepository.find();
  }

  async findOneOrFail(
    conditions: FindOptionsWhere<CustomerEntity>,
    options?: FindOneOptions<CustomerEntity>,
  ) {
    try {
      const user = await this.customerRepository.findOneOrFail({
        where: conditions,
        ...options,
      });

      return user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('Consumidor nao encontrado'); // Mensagem de erro mais clara
    }
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerRepository.findOne({
      where: { id: id },
    });
    this.customerRepository.merge(customer, updateCustomerDto);
    return await this.customerRepository.save(customer);
  }

  async remove(id: string): Promise<void> {
    await this.customerRepository.delete({id})
  }


  async addWatermeter(dto: CreateCustomerHasWatermeterDto) {
    const exists = await this.customerHasWatermeterRepo.findOneBy({
      customerId: dto.customerId,
      watermeterId: dto.watermeterId,
    });

    if (exists) {
       throw new NotFoundException(
        'Este contador de água já está associado a este cliente.',
      );
    }

    const association = this.customerHasWatermeterRepo.create(dto);
    return await this.customerHasWatermeterRepo.save(association);
  }

  // customer.service.ts
  async removeWatermeter(customerId: string, watermeterId: string) {
    const exists = await this.customerHasWatermeterRepo.findOneBy({
      customerId,
      watermeterId,
    });

    if (!exists) {
      throw new Error('Associação entre cliente e contador não encontrada.');
    }

    await this.customerHasWatermeterRepo.delete({
      customerId,
      watermeterId,
    });

    return { message: 'Associação removida com sucesso.' };
  }
}
