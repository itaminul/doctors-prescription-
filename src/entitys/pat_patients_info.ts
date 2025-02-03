import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Patientsrx } from './patientsrx';
import { Doctor } from './doctor';

@Entity('pat_patients_info')
export class pat_patients_info {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;
  @Column({ type: 'varchar', length: 50, nullable: true })
  SL_NO: number;

  @Column({ type: 'date', nullable: true })
  ENTRY_DATE: Date;

  @Column({ type: 'int', nullable: true })
  CATEGORY_ID: number;

  @Column({ type: 'int', default: 0 })
  PATIENT_STATUS: number;

  @Column({ type: 'datetime', nullable: true })
  START_TIME: Date;

  @Column({ type: 'datetime', nullable: true })
  END_TIME: Date;

  @Column({ type: 'int', nullable: true })
  DEPT_ID: number;

  @Column({ type: 'int', nullable: true })
  ROOM_NO: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  REMARKS: string;

  @Column({ type: 'date', nullable: true })
  DATE_OF_BIRTH: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  GENDER: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  AGE: string;

  @Column({ type: 'tinyint', default: 1 })
  ACTIVE_STATUS: boolean;

  @Column()
  ADDRESS: string;
  @Column()
  REG_NO: string;  

  @Column({ type: 'varchar', length: 15, nullable: true })
  MOBILE_NO: string;

  @Column({ type: 'int', nullable: true })
  created_by: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'int', nullable: true })
  updated_by: number;

  @Column({ type: 'datetime', nullable: true })
  updated_at: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  OTP_CODE: string;

  @Column({ type: 'int', nullable: true })
  OTP_COUNT: number;

  @Column({ type: 'datetime', nullable: true })
  OTP_REQ_TIME: Date;
  @OneToMany(() => Patientsrx, (patRx) => patRx.patPatientInfo, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'patientId' })
  patientsrx: pat_patients_info[];

  @ManyToOne(() => Doctor, doctor => doctor.doctorInfo)
  doctor: Doctor;
  patPatienInfo: pat_patients_info[];
}
