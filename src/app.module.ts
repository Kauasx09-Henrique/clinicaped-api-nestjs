import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { EnderecosModule } from './enderecos/enderecos.module';
import { ClinicaModule } from './clinica/clinica.module';
import { MarcarConsultaModule } from './marcar_consulta/marcar_consulta.module';
import { LoginUserModule } from './login_user/login_user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: String(process.env.DB_PASSWORD),
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    UsersModule,
    EnderecosModule,
    ClinicaModule,
    MarcarConsultaModule,
    LoginUserModule,
  ],
 
})
export class AppModule {}