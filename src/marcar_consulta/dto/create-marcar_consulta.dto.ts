import { IsDateString, IsNotEmpty, IsInt, IsString, Matches } from 'class-validator';

export class CreateMarcarConsultaDto {
  @IsDateString({}, { message: 'A data da consulta deve estar no formato YYYY-MM-DD.' })
  @IsNotEmpty({ message: 'A data da consulta é obrigatória.' })
  data_consulta: string;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'O horário deve estar no formato HH:mm.' })
  @IsNotEmpty({ message: 'O horário da consulta é obrigatório.' })
  horario_consulta: string;

  @IsInt({ message: 'O userId deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O userId é obrigatório.' })
  userId: number;

  @IsInt({ message: 'O clinicaId deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O clinicaId é obrigatório.' })
  clinicaId: number;
}