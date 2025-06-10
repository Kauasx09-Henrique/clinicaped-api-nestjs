import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MarcarConsulta } from "src/marcar_consulta/entities/marcar_consulta.entity";




export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

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
  user_data_nascimento: Date; 

  @Column()
  user_genero: string;

  @Column({ length: 20 })
  user_telefone: string;

  @Column({ length: 15 })
  user_cpf: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER, // Garante que todo novo usuário seja 'USER' por padrão
  })
  role: UserRole;


  @OneToMany(() => MarcarConsulta, (consulta) => consulta.user) 
  marcar_consulta: MarcarConsulta[];
}
