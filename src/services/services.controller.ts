import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post(':email')
  async create(
    @Body() createServiceDto: CreateServiceDto,
    @Param('email') email: string,
  ) {
    return this.servicesService.create(createServiceDto, email);
  }

  @Get()
  async findAll() {
    return this.servicesService.findAll();
  }
}
