import {
  Controller,
  Post,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/util/roles';

@UseGuards(RolesGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Roles(Role.Client)
  @Post(':id')
  async create(
    @Body() reservationDto: CreateReservationDto,
    @Param('id') id: string,
  ) {
    return this.reservationsService.create(reservationDto, id);
  }

  @Roles(Role.Client)
  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    return this.reservationsService.cancel(id);
  }

  @Get()
  async findAll() {
    return this.reservationsService.findAll();
  }
}
