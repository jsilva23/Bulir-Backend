import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  MinLength,
} from 'class-validator';
import { Role } from 'src/util/roles';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  nif: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsEnum(Role)
  role: Role;
}
