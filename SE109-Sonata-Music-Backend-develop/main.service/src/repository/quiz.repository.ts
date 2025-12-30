import { Quiz } from '@/models/quiz.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IQuizRepository } from '@/repository/interface/i.quiz.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class QuizRepository extends BaseRepository<Quiz> implements IQuizRepository<Quiz> {
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(Quiz));
  }
  async getUnansweredQuizzesByMusicId(listenerId: number, musicId: number): Promise<Quiz[]> {
    const quizzes = await this.ormRepository
      .createQueryBuilder('quiz')
      .leftJoin('quiz.listenerAnswerQuizzes', 'listenerAnswerQuiz', 'listenerAnswerQuiz.listenerId = :listenerId', {
        listenerId
      })
      .where('quiz.musicId = :musicId', { musicId })
      .andWhere('listenerAnswerQuiz.id IS NULL') // Ensures the listener has not answered the quiz
      .select(['quiz.id', 'quiz.content', 'quiz.answerA', 'quiz.answerB', 'quiz.answerC', 'quiz.answerD'])
      .getMany();

    return quizzes;
  }
}
