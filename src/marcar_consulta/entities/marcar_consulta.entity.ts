import { Clinica } from "src/clinica/entities/clinica.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/entities/user.entity"; 

@Entity({ name: 'marcarconsultas' })
export class MarcarConsulta {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({ type: 'date' })
  data_consulta: Date;

  @Column({ type: 'time' })
  horario_consulta: string;

  @Column()
  motivo_consulta: string;


@ManyToOne(() => Clinica, clinica => clinica.marcar_consulta)
clinica: Clinica;

@ManyToOne(() => User, user => user.marcar_consulta)
user: User;

}