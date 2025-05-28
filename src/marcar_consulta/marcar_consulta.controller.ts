import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarcarConsultaService } from './marcar_consulta.service';
import { CreateMarcarConsultaDto } from './dto/create-marcar_consulta.dto';
import { UpdateMarcarConsultaDto } from './dto/update-marcar_consulta.dto';

@Controller('marcar-consulta')
export class MarcarConsultaController {
  constructor(private readonly marcarConsultaService: MarcarConsultaService) {}

  @Post()
  create(@Body() createMarcarConsultaDto: CreateMarcarConsultaDto) {
    return this.marcarConsultaService.create(createMarcarConsultaDto);
  }

  @Get()
  findAll() {
    return this.marcarConsultaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marcarConsultaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarcarConsultaDto: UpdateMarcarConsultaDto) {
    return this.marcarConsultaService.update(+id, updateMarcarConsultaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marcarConsultaService.remove(+id);
  }
}
