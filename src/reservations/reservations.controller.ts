import { Controller, Post, Get, Body, Patch } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateServiceDto } from 'src/services/dto/create-service.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  async create(@Body() reservationDto: CreateServiceDto) {
    return this.reservationsService.create(reservationDto);
  }

  @Patch(':id/cancel')
  async cancel() {
    return this.reservationsService.cancel();
  }

  @Get()
  async findAll() {
    return this.reservationsService.findAll();
  }
}
