import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'bulir',
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    ServicesModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
