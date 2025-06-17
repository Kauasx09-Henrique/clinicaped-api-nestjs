import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Endereco } from 'src/enderecos/entities/endereco.entity';
import { MarcarConsulta } from 'src/marcar_consulta/entities/marcar_consulta.entity';

@Entity({ name: 'clinicas' })
export class Clinica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome_clinica: string;

  @Column({ nullable: true })
  especialidade_consulta: string;

  @Column({ nullable: true })
  telefone_clinica: string;

  @Column({ nullable: true })
  logo_clinica: string;

  @Column({ default: false })
  aceita_convenios: boolean;

  @OneToMany(() => Endereco, (endereco) => endereco.clinica, { eager: true })
  enderecos: Endereco[];


   @OneToMany(() => MarcarConsulta, (consulta) => consulta.clinica)
  marcar_consulta: MarcarConsulta[];
}
