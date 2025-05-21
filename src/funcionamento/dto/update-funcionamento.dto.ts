import { PartialType } from '@nestjs/mapped-types';
import { CreateFuncionamentoDto } from './create-funcionamento.dto';

export class UpdateFuncionamentoDto extends PartialType(CreateFuncionamentoDto) {}
