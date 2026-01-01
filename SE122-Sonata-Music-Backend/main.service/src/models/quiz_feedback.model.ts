import { BaseModel } from '@/models/base/base.model';
import { Listener } from '@/models/listener.model';
import { Quiz } from '@/models/quiz.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('quiz_feedbacks')
export class QuizFeedback extends BaseModel {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ name: 'quiz_id' })
  quizId!: number;

  @Column({ name: 'listener_id' })
  listenerId!: number;

  @Column('text', { nullable: true })
  comment!: string;

  @ManyToOne(() => Quiz)
  @JoinColumn({ name: 'quiz_id' })
  quiz!: Quiz;

  @ManyToOne(() => Listener)
  @JoinColumn({ name: 'listener_id' })
  listener!: Listener;
}
