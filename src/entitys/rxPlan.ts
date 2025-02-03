import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Patientsrx } from './patientsrx';
import { SetPlain } from './setPlan';

@Entity()
export class RxPlain {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: 1 })
  doctorId: number;
  @Column({ default: 1 })
  orgId: number;
  @Column({ default: 1 })
  activeStatus: number;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  @Column({ type: 'int', nullable: true })
  updated_by: number;
  @Column({ type: 'datetime', nullable: true })
  updated_at: Date;

  
  @ManyToOne(() => Patientsrx, (patientRx) => patientRx.rxPlain)
  @JoinColumn({ name: 'patientsrxid' })
  patientRx: Patientsrx

  @ManyToOne(() => SetPlain, (setP) => setP.rxPlain, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'plainId' })
  setPlain: SetPlain;

}
