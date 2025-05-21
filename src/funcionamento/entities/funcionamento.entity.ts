import { Clinica } from "src/clinica/entities/clinica.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'funcionamento' })
export class funcionamento {
  @PrimaryGeneratedColumn()
  id_horario_funcionamento: number;

  @Column()
  dia_semana: string;

  @Column({ type: 'time' })
  hora_abertura: string;

  @Column({ type: 'time' })
  hora_fechamento: string;

 @ManyToOne(() => Clinica, () => Clinica.funcionamento)
  clinica: any;
}
