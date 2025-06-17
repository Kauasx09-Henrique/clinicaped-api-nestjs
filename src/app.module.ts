// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { EnderecosModule } from './enderecos/enderecos.module';
import { ClinicaModule } from './clinica/clinica.module';
import { MarcarConsulta } from './marcar_consulta/entities/marcar_consulta.entity';
import { MarcarConsultaModule } from './marcar_consulta/marcar_consulta.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule, 
    EnderecosModule,
    ClinicaModule,
    MarcarConsulta,
    MarcarConsultaModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}