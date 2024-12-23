import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Teacher } from '../teachers/teacher.entity';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  studentName: string;

  @Column()
  status: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.courses)
  teacher: Teacher;
}
