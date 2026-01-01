import { QuizController } from '@/controller/quiz.controller';
import { QuizService } from '@/service/quiz.service';
import { Quiz } from '@/models/quiz.model';
import { QuizRepository } from '@/repository/quiz.repository';
import { IQuizService } from '@/service/interface/i.quiz.service';
import { IQuizRepository } from '@/repository/interface/i.quiz.repository';
import { BaseContainer } from '@/container/base.container';
import { IListenerAnswerQuizRepository } from '@/repository/interface/i.listener_answer_quiz.repository';
import { ListenerAnswerQuiz } from '@/models/listener_answer_quiz.model';
import { listenerAnswerQuizRepository } from '@/container/listener_answer_quiz.container';
import { IListenerRepository } from '@/repository/interface/i.listener.repository';
import { listenerRepository } from '@/container/listener.container';

class QuizContainer extends BaseContainer {
  constructor() {
    super(Quiz);
    this.container.bind<IQuizService<Quiz>>('QuizService').to(QuizService);
    this.container.bind<IQuizRepository<Quiz>>('QuizRepository').to(QuizRepository);
    this.container.bind<QuizController>(QuizController).toSelf();

    //Importt
    this.container
      .bind<IListenerAnswerQuizRepository<ListenerAnswerQuiz>>('ListenerAnswerQuizRepository')
      .toConstantValue(listenerAnswerQuizRepository);

    this.container.bind<IListenerRepository<any>>('ListenerRepository').toConstantValue(listenerRepository);
  }

  export() {
    const quizController = this.container.get<QuizController>(QuizController);
    const quizService = this.container.get<IQuizService<any>>('QuizService');
    const quizRepository = this.container.get<IQuizRepository<any>>('QuizRepository');

    return { quizController, quizService, quizRepository };
  }
}

const quizContainer = new QuizContainer();
const { quizController, quizService, quizRepository } = quizContainer.export();
export { quizController, quizService, quizRepository };
