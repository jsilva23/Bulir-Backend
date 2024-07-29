import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UsersService } from 'src/users/users.service';
import { ServicesService } from 'src/services/services.service';
import { UpdateReservationDto } from './dto/update-reservation.dto copy';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>,
    private usersService: UsersService,
    private servicesService: ServicesService,
  ) {}

  async create(
    request: Request,
    reservationDto: CreateReservationDto,
    id: string,
  ): Promise<Reservation> {
    const currentUser: User = request['currentUser'];

    const service = await this.servicesService.findOne(id);

    if (!service) {
      throw new BadRequestException('Serviço não encotrado');
    }

    if (currentUser.balance < service.price) {
      throw new BadRequestException(
        'Saldo insuficiente para realizar o pedido! Faça um depósito de saldo.',
      );
    }

    const newBalance = currentUser.balance - service.price;
    await this.usersService.updateUserBalance(currentUser.id, newBalance);

    const newProviderBalance = service.provider.balance + service.price;
    await this.usersService.updateUserBalance(
      service.provider.id,
      newProviderBalance,
    );

    const reservation = new Reservation();
    reservation.service = service;
    reservation.customer = currentUser;
    reservation.date = reservationDto.date;

    return this.reservationsRepository.save(reservation);
  }

  async cancel(id: string, request: Request) {
    const reservation = await this.getReservation(id);

    if (!reservation) {
      throw new BadRequestException('Reserva não encotrada');
    }

    const currentUser: User = request['currentUser'];

    reservation.canceled = true;

    const service = reservation.service;

    const customerNewBalance = currentUser.balance + service.price;
    await this.usersService.updateUserBalance(
      currentUser.id,
      customerNewBalance,
    );

    const serviceFound = await this.servicesService.findOne(service.id);

    serviceFound.provider.balance -= service.price;
    await this.usersService.updateUserBalance(
      serviceFound.provider.id,
      serviceFound.provider.balance,
    );

    return this.reservationsRepository.update(id, reservation);
  }

  async update(id: string, reservationDto: UpdateReservationDto) {
    const reservation = await this.getReservation(id);

    if (!reservation) {
      throw new BadRequestException('Reserva não encotrada');
    }

    return this.reservationsRepository.update(id, { ...reservationDto });
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationsRepository.find({
      relations: ['customer', 'service'],
    });
  }

  async getReservation(id: string): Promise<Reservation> {
    const reservation = await this.reservationsRepository.findOne({
      where: { id },
      relations: ['customer', 'service'],
    });
    return reservation;
  }
}
