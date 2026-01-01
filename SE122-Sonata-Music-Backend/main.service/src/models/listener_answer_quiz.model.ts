import { BaseModel } from '@/models/base/base.model';
import { Listener } from '@/models/listener.model';
import { Quiz } from '@/models/quiz.model';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'listener_answer_quiz' })
export class ListenerAnswerQuiz extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id!: number;

  @Column({ name: 'listener_id', type: 'bigint' })
  listenerId!: number;

  @Column({ name: 'quiz_id', type: 'bigint' })
  quizId!: number;

  @ManyToOne(() => Listener)
  @JoinColumn({ name: 'listener_id' })
  listener!: Listener;

  @ManyToOne(() => Quiz)
  @JoinColumn({ name: 'quiz_id' })
  quiz!: Quiz;
}
