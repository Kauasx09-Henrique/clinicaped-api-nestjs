import { PartialType } from '@nestjs/mapped-types';
import { CreateMarcarConsultaDto } from './create-marcar_consulta.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ConsultaStatus } from '../entities/marcar_consulta.entity';

export class UpdateMarcarConsultaDto extends PartialType(CreateMarcarConsultaDto) {
  @IsEnum(ConsultaStatus)
  @IsOptional()
  status?: ConsultaStatus;
}