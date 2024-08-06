import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
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
  @Post()
  async create(
    @Body() createServiceDto: CreateServiceDto,
    @Req() request: Request,
  ) {
    return this.servicesService.create(createServiceDto, request);
  }

  @Roles(Role.Provider)
  @Patch(':id')
  async edit(
    @Body() createServiceDto: CreateServiceDto,
    @Param('id') id: string,
  ) {
    return this.servicesService.update(createServiceDto, id);
  }

  @Get()
  async findAll() {
    return this.servicesService.findAll();
  }

  @Roles(Role.Provider)
  @Get('provider')
  async findProviderServices(@Req() request: Request) {
    return this.servicesService.findServices(request);
  }

  @Roles(Role.Provider)
  @Delete(':id')
  removeBook(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
}
