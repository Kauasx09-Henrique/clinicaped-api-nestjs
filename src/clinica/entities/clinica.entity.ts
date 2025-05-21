import { Endereco } from "src/enderecos/entities/endereco.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'clinica' })
export class Clinica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome_clinica: string;

  @Column()
  especialidade_consulta: string;

  @Column({ unique: true})
  cnpj_clinica: string;

  @Column()
  email_clinica: string;

  @Column()
  telefone_clinica: string;


  @Column({ default: false })
  aceita_convenios: boolean;


  @Column({ nullable: true })
  observacoes: string;

  @Column({ nullable: true })
  logo_clinica: string;

  @OneToMany(() => Endereco, (endereco) => endereco.clinica)
  enderecos: Endereco[];
  static enderecos: any;
  Funcionamento: any;
  static funcionamento: any;
}
