import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MarcarConsulta } from "src/marcar_consulta/entities/marcar_consulta.entity";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_nome: string;

  @Column()
  user_senha: string;

  @Column({ unique: true })
  user_email: string;

  @Column({ type: 'date' })
  user_data_nascimento: Date; // Relacionado ao erro anterior de valores nulos

  @Column()
  user_genero: string;

  @Column({ length: 15 })
  user_telefone: string;

  @Column({ length: 14 })
  user_cpf: string;

  @OneToMany(() => MarcarConsulta, (consulta) => consulta.user) // Ponto de atenção aqui
  marcar_consulta: MarcarConsulta[];

  static marcar_consulta: any; // Esta linha está incorreta para relacionamentos
}