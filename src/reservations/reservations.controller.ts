import {
  Controller,
  Post,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/util/roles';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@UseGuards(RolesGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Roles(Role.Client)
  @Post(':id')
  async create(
    @Body() reservationDto: CreateReservationDto,
    @Param('id') id: string,
    @Req() request: Request,
  ) {
    return this.reservationsService.create(request, reservationDto, id);
  }

  @Roles(Role.Client)
  @Patch(':id/cancel')
  async cancel(@Param('id') id: string, @Req() request: Request) {
    return this.reservationsService.cancel(id, request);
  }

  @Roles(Role.Client)
  @Patch(':id/cancel')
  async update(
    @Body() reservationDto: UpdateReservationDto,
    @Param('id') id: string,
  ) {
    return this.reservationsService.update(id, reservationDto);
  }

  @Get('history')
  async findAll() {
    return this.reservationsService.findAll();
  }
}
