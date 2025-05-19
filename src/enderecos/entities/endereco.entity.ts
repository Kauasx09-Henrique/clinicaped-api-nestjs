import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'enderecos' })
export class Endereco {
  @PrimaryGeneratedColumn()
  id_endereco: number;

  @Column()
  endereco_logradouro: string;

  @Column()
  endereco_complemento: string;

  @Column()
  endereco_rua: string;

  @Column()
  endereco_numero: string;

  @ManyToOne(() => User, (user) => user.enderecos)
  user: User;
}
