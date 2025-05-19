import { Endereco } from "src/enderecos/entities/endereco.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  idade: number;

  @Column()
  sexo: string;

  @Column()
  telefone: string;

  @Column()
  cpf: string;

  @OneToMany(() => Endereco, (endereco) => endereco.user)
  enderecos: Endereco[];
}
