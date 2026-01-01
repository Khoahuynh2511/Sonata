import { QuizFeedback } from '@/models/quiz_feedback.model';
import { IQuizFeedbackRepository } from '@/repository/interface/i.quiz_feedback.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IQuizFeedbackService } from '@/service/interface/i.quiz_feedback.service';
import { inject, injectable } from 'inversify';

@injectable()
export class QuizFeedbackService extends BaseCrudService<QuizFeedback> implements IQuizFeedbackService<QuizFeedback> {
  private quizFeedbackRepository: IQuizFeedbackRepository<QuizFeedback>;

  constructor(@inject('QuizFeedbackRepository') quizFeedbackRepository: IQuizFeedbackRepository<QuizFeedback>) {
    super(quizFeedbackRepository);
    this.quizFeedbackRepository = quizFeedbackRepository;
  }
}
