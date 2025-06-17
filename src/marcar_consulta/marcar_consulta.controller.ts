import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MarcarConsultaService } from './marcar_consulta.service';
import { CreateMarcarConsultaDto } from './dto/create-marcar_consulta.dto';
import { UpdateMarcarConsultaDto } from './dto/update-marcar_consulta.dto';

@Controller('consultas') // URL base: http://localhost:3000/consultas
export class MarcarConsultaController {
  constructor(private readonly marcarConsultaService: MarcarConsultaService) {}

  @Post()
  create(@Body() createDto: CreateMarcarConsultaDto) {
    return this.marcarConsultaService.create(createDto);
  }

  @Get()
  findAll() {
    return this.marcarConsultaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.marcarConsultaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateMarcarConsultaDto) {
    return this.marcarConsultaService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.marcarConsultaService.remove(id);
  }
}