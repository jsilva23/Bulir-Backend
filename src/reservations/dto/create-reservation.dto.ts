import { IsNotEmpty, IsString } from 'class-validator';
export class CreateReservationDto {
  @IsNotEmpty()
  @IsString()
  serviceId: string;

  @IsNotEmpty()
  date: Date;
}
