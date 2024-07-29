import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>,
  ) {}

  async create(reservationDto: CreateReservationDto): Promise<Reservation> {
    return this.reservationsRepository.save(reservationDto);
  }

  async cancel() {}

  async findAll(): Promise<Reservation[]> {
    return this.reservationsRepository.find();
  }
}
