/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateCustomerHasWatermeterDto } from './dto/create-customer-has-watermeter.dto';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.customersService.findOneOrFail({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.customersService.remove(id)
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-watermeter')
  async addWatermeter(@Body() dto: CreateCustomerHasWatermeterDto) {
    return this.customersService.addWatermeter(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':customerId/watermeter/:watermeterId')
  async removeWatermeter(
    @Param('customerId', new ParseUUIDPipe()) customerId: string,
    @Param('watermeterId', new ParseUUIDPipe()) watermeterId: string,
  ) {
    return this.customersService.removeWatermeter(customerId, watermeterId);
  }
}
