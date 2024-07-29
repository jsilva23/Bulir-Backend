import { Role } from 'src/util/roles';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
