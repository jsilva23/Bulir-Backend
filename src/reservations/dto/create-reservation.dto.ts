import { IsNotEmpty } from 'class-validator';
export class CreateReservationDto {
  @IsNotEmpty()
  date: Date;
}
