import { PartialType } from '@nestjs/mapped-types';
import { CreateMarcarConsultaDto } from './create-marcar_consulta.dto';

export class UpdateMarcarConsultaDto extends PartialType(CreateMarcarConsultaDto) {
}
