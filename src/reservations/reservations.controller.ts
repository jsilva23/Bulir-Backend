import { Controller, Post, Get, Body, Patch, Param } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post(':id')
  async create(
    @Body() reservationDto: CreateReservationDto,
    @Param('id') id: string,
  ) {
    return this.reservationsService.create(reservationDto, id);
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
