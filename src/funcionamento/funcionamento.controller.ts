import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FuncionamentoService } from './funcionamento.service';
import { CreateFuncionamentoDto } from './dto/create-funcionamento.dto';
import { UpdateFuncionamentoDto } from './dto/update-funcionamento.dto';

@Controller('funcionamento')
export class FuncionamentoController {
  constructor(private readonly funcionamentoService: FuncionamentoService) {}

  @Post()
  create(@Body() createFuncionamentoDto: CreateFuncionamentoDto) {
    return this.funcionamentoService.create(createFuncionamentoDto);
  }

  @Get()
  findAll() {
    return this.funcionamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.funcionamentoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFuncionamentoDto: UpdateFuncionamentoDto) {
    return this.funcionamentoService.update(+id, updateFuncionamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.funcionamentoService.remove(+id);
  }
}
