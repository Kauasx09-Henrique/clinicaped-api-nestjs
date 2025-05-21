
import { Entity, PrimaryGeneratedColumn, Column,} from "typeorm";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_nome: string;

  @Column()
  user_senha: string;

  @Column({ unique: true})
  user_email: string;

  @Column()
  user_data_nascimento: Date;

  @Column()
  user_genero: string;

  @Column({ length: 15 })
  user_telefone: string;

  @Column({ length: 14 })
  user_cpf: string;
}
