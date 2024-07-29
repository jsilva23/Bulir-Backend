import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Service } from 'src/services/entities/service.entity';
import { Role } from 'src/util/roles';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  nif: string;

  @Column()
  passwordHash: string;

  @Column({ type: 'enum', enum: ['Client', 'Provider'], default: 'Client' })
  role: Role;

  @Column({ default: 0 })
  balance: number;

  @OneToMany(() => Service, (service) => service.provider)
  services: Service[];
}
