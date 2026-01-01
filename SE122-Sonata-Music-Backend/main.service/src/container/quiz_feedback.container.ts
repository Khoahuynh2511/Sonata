import { QuizFeedbackController } from '@/controller/quiz_feedback.controller';
import { QuizFeedbackService } from '@/service/quiz_feedback.service';
import { QuizFeedback } from '@/models/quiz_feedback.model';
import { QuizFeedbackRepository } from '@/repository/quiz_feedback.repository';
import { IQuizFeedbackService } from '@/service/interface/i.quiz_feedback.service';
import { IQuizFeedbackRepository } from '@/repository/interface/i.quiz_feedback.repository';
import { BaseContainer } from '@/container/base.container';

class QuizFeedbackContainer extends BaseContainer {
  constructor() {
    super(QuizFeedback);
    this.container.bind<IQuizFeedbackService<QuizFeedback>>('QuizFeedbackService').to(QuizFeedbackService);
    this.container.bind<IQuizFeedbackRepository<QuizFeedback>>('QuizFeedbackRepository').to(QuizFeedbackRepository);
    this.container.bind<QuizFeedbackController>(QuizFeedbackController).toSelf();
  }

  export() {
    const quizFeedbackController = this.container.get<QuizFeedbackController>(QuizFeedbackController);
    const quizFeedbackService = this.container.get<IQuizFeedbackService<any>>('QuizFeedbackService');
    const quizFeedbackRepository = this.container.get<IQuizFeedbackRepository<any>>('QuizFeedbackRepository');

    return { quizFeedbackController, quizFeedbackService, quizFeedbackRepository };
  }
}

const quizFeedbackContainer = new QuizFeedbackContainer();
const { quizFeedbackController, quizFeedbackService, quizFeedbackRepository } = quizFeedbackContainer.export();
export { quizFeedbackController, quizFeedbackService, quizFeedbackRepository };
