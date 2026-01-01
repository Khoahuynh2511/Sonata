import { BaseModel } from '@/models/base/base.model';
import { Contributor } from '@/models/contributor.model';
import { ListenerAnswerQuiz } from '@/models/listener_answer_quiz.model';
import { Music } from '@/models/music.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, OneToMany } from 'typeorm';

@Entity({ name: 'quizzes' })
export class Quiz extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id!: number;

  @Column({ name: 'content', type: 'text' })
  content!: string;

  @Column({ name: 'answer_a', type: 'varchar', length: 50, nullable: true })
  answerA!: string;

  @Column({ name: 'answer_b', type: 'varchar', length: 50, nullable: true })
  answerB!: string;

  @Column({ name: 'answer_c', type: 'varchar', length: 50, nullable: true })
  answerC!: string;

  @Column({ name: 'answer_d', type: 'varchar', length: 50, nullable: true })
  answerD!: string;

  @Column({ name: 'correct_answer', type: 'varchar', length: 1 })
  correctAnswer!: string;

  @Column({ name: 'created_by_id' })
  createdById!: number;

  @Column({ name: 'updated_by_id', nullable: true })
  updatedById!: number;

  @ManyToOne(() => Contributor)
  @JoinColumn({ name: 'created_by_id' })
  createdBy!: Contributor;

  @ManyToOne(() => Contributor, { nullable: true })
  @JoinColumn({ name: 'updated_by_id' })
  updatedBy!: Contributor;

  @Column({ name: 'music_id' })
  musicId!: number;

  @ManyToOne(() => Music)
  @JoinColumn({ name: 'music_id' })
  music!: Music;

  @OneToMany(() => ListenerAnswerQuiz, (listenerAnswerQuiz) => listenerAnswerQuiz.quiz)
  listenerAnswerQuizzes!: ListenerAnswerQuiz[];
}
