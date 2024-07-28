import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ClientsModule } from './clients/clients.module';
import { ProvidersModule } from './providers/providers.module';

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
    ProvidersModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
