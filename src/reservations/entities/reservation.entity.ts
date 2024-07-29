import { Service } from 'src/services/entities/service.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'reservations' })
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  customer: User;

  @ManyToOne(() => Service)
  service: Service;

  @Column()
  date: Date;

  @Column({ default: false })
  canceled: boolean;
}
