import { Service } from 'src/services/entities/service.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'reservations' })
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.reservations)
  customer: User;

  @ManyToOne(() => Service)
  @JoinColumn()
  service: Service;

  @Column()
  date: Date;

  @Column({ default: false })
  canceled: boolean;
}
