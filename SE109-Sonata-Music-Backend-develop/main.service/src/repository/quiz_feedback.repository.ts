import { QuizFeedback } from '@/models/quiz_feedback.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IQuizFeedbackRepository } from '@/repository/interface/i.quiz_feedback.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class QuizFeedbackRepository
  extends BaseRepository<QuizFeedback>
  implements IQuizFeedbackRepository<QuizFeedback>
{
  constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
    super(dataSource.getRepository(QuizFeedback));
  }
}
