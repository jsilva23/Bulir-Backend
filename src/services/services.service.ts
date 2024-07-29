import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
    private usersService: UsersService,
  ) {}

  async create(
    createServiceDto: CreateServiceDto,
    request: Request,
  ): Promise<Service> {
    const service = new Service();
    service.name = createServiceDto.name;
    service.description = createServiceDto.description;
    service.price = createServiceDto.price;

    const currentUser: User = request['currentUser'];

    service.provider = currentUser;

    return this.servicesRepository.save(service);
  }

  async findAll(): Promise<Service[]> {
    return this.servicesRepository.find({ relations: ['provider'] });
  }

  async findOne(id: string): Promise<Service> {
    const service = await this.servicesRepository.findOne({
      where: { id },
      relations: ['provider'],
    });

    return service;
  }
}
