import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UsersService } from 'src/users/users.service';
import { ServicesService } from 'src/services/services.service';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>,
    private usersService: UsersService,
    private servicesService: ServicesService,
  ) {}

  async create(
    reservationDto: CreateReservationDto,
    id: string,
  ): Promise<Reservation> {
    const customer = await this.usersService.findOne(id);

    const service = await this.servicesService.findOne(
      reservationDto.serviceId,
    );

    if (!customer || !service) {
      throw new BadRequestException('Serviço não encotrado');
    }

    if (customer.balance < service.price) {
      throw new BadRequestException(
        'Saldo insuficiente para realizar o pedido! Faça um depósito de saldo.',
      );
    }

    const newBalance = customer.balance - service.price;
    await this.usersService.updateUserBalance(customer.id, newBalance);

    const newProviderBalance = service.provider.balance + service.price;
    await this.usersService.updateUserBalance(
      service.provider.id,
      newProviderBalance,
    );

    const reservation = new Reservation();
    reservation.service = service;
    reservation.customer = customer;
    reservation.date = reservationDto.date;

    console.log('REserva: ', reservation);

    return this.reservationsRepository.save(reservation);
  }

  async cancel(id: string) {
    const reservation = await this.reservationsRepository.findOne({
      where: { id },
      relations: ['customer', 'service'],
    });

    if (!reservation) {
      throw new BadRequestException('Reserva não encotrada');
    }

    reservation.canceled = true;
    const customer = reservation.customer;
    const service = reservation.service;

    customer.balance += service.price;
    await this.usersService.updateUserBalance(customer.id, customer.balance);

    const serviceFound = await this.servicesService.findOne(service.id);
    console.log('Service: ', serviceFound);
    serviceFound.provider.balance -= service.price;
    await this.usersService.updateUserBalance(
      serviceFound.provider.id,
      serviceFound.provider.balance,
    );

    return this.reservationsRepository.update(id, reservation);
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationsRepository.find();
  }
}
