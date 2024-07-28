import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateProviderDto {
  @IsNotEmpty()
  @IsString()
  readonly fullName: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly nif: string;

  @IsString()
  @MinLength(8)
  readonly password: string;
}