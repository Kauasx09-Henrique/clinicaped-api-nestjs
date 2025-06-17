import { Clinica } from 'src/clinica/entities/clinica.entity';
import { User } from 'src/users/entities/user.entity';
import { 
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, 
  CreateDateColumn, UpdateDateColumn, JoinColumn 
} from "typeorm";

export enum ConsultaStatus {
  AGENDADA = 'AGENDADA',
  REALIZADA = 'REALIZADA',
  CANCELADA = 'CANCELADA',
}

@Entity({ name: 'marcar_consultas' })
export class MarcarConsulta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  data_consulta: Date;

  @Column({ type: 'time' })
  horario_consulta: string;
  
  @Column({ type: 'enum', enum: ConsultaStatus, default: ConsultaStatus.AGENDADA })
  status: ConsultaStatus;

  // RELACIONAMENTO: Muitas consultas pertencem a UM usuário.
  @ManyToOne(() => User, (user) => user.marcar_consulta)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // RELACIONAMENTO: Muitas consultas pertencem a UMA clínica.
  @ManyToOne(() => Clinica, (clinica) => clinica.marcar_consulta)
  @JoinColumn({ name: 'clinica_id' })
  clinica: Clinica;
  
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}