import { IsNotEmpty } from 'class-validator';

export class DepositDto {
  @IsNotEmpty()
  balance: number;
}
