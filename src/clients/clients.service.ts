import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientsRepository: Repository<Client>,
  ) {}

  create(createClientDto: CreateClientDto): Promise<Client> {
    const user = new Client();
    user.fullName = createClientDto.fullName;
    user.nif = createClientDto.nif;

    return this.clientsRepository.save(user);
  }

  findAll(): Promise<Client[]> {
    return this.clientsRepository.find();
  }
}
