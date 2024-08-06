import { IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  identifier: string;

  @IsNotEmpty()
  password: string;
}
