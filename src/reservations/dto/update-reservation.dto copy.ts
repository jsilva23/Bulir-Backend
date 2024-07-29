import { IsNotEmpty } from 'class-validator';
export class UpdateReservationDto {
  @IsNotEmpty()
  date: Date;
}
