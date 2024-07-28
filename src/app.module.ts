import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ClientsModule } from './users/clients.module';

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
    ClientsModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
