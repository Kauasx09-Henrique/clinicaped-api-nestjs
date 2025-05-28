import { Clinica } from "src/clinica/entities/clinica.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

  @ManyToOne(() => Clinica, () => Clinica.enderecos)
  clinica: any;
  Clinica: any;
}
