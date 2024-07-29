import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/util/roles';
import { RolesGuard } from 'src/guards/roles.guard';

@UseGuards(RolesGuard)
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Roles(Role.Provider)
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
