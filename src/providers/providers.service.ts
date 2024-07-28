import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providersRepository: Repository<Provider>,
  ) {}

  create(createProviderDto: CreateProviderDto): Promise<Provider> {
    const user = new Provider();
    user.fullName = createProviderDto.fullName;
    user.nif = createProviderDto.nif;

    return this.providersRepository.save(user);
  }

  findAll(): Promise<Provider[]> {
    return this.providersRepository.find();
  }
}
