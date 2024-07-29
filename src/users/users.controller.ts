import { Controller, Get, Post, Body, Patch, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/decorators/public.decorator';
import { User } from './entities/user.entity';
import { DepositDto } from './dto/deposit.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch('deposit')
  cashDeposit(@Body() depositDto: DepositDto, @Req() request: Request) {
    const currentUser: User = request['currentUser'];
    const newBalance = Number(depositDto.balance) + Number(currentUser.balance);
    return this.usersService.updateUserBalance(currentUser.id, newBalance);
  }
}
