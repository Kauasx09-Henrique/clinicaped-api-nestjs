import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Clinica } from 'src/clinica/entities/clinica.entity';

@Entity({ name: 'enderecos' })
export class Endereco {
  @PrimaryGeneratedColumn()
  id_endereco: number;

  @Column()
  endereco_cep: string;

  @Column()
  endereco_complemento: string;

  @Column()
  endereco_numero_casa: string;

  @Column()
  endereco_bairro: string;

  @Column()
  endereco_uf: string;

  @ManyToOne(() => Clinica, clinica => clinica.enderecos, { eager: false })
  clinica: Clinica;
}
