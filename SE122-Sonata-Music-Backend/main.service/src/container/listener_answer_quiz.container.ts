import { ListenerAnswerQuizController } from '@/controller/listener_answer_quiz.controller';
import { ListenerAnswerQuizService } from '@/service/listener_answer_quiz.service';
import { ListenerAnswerQuiz } from '@/models/listener_answer_quiz.model';
import { ListenerAnswerQuizRepository } from '@/repository/listener_answer_quiz.repository';
import { IListenerAnswerQuizService } from '@/service/interface/i.listener_answer_quiz.service';
import { IListenerAnswerQuizRepository } from '@/repository/interface/i.listener_answer_quiz.repository';
import { BaseContainer } from '@/container/base.container';

class ListenerAnswerQuizContainer extends BaseContainer {
  constructor() {
    super(ListenerAnswerQuiz);
this.container.bind<IListenerAnswerQuizService<ListenerAnswerQuiz>>('ListenerAnswerQuizService').to(ListenerAnswerQuizService);
this.container.bind<IListenerAnswerQuizRepository<ListenerAnswerQuiz>>('ListenerAnswerQuizRepository').to(ListenerAnswerQuizRepository);
this.container.bind<ListenerAnswerQuizController>(ListenerAnswerQuizController).toSelf();
}

export() {
    const listenerAnswerQuizController = this.container.get<ListenerAnswerQuizController>(ListenerAnswerQuizController);
    const listenerAnswerQuizService = this.container.get<IListenerAnswerQuizService<any>>('ListenerAnswerQuizService');
    const listenerAnswerQuizRepository = this.container.get<IListenerAnswerQuizRepository<any>>('ListenerAnswerQuizRepository');

return { listenerAnswerQuizController, listenerAnswerQuizService, listenerAnswerQuizRepository };
}
}

const listenerAnswerQuizContainer = new ListenerAnswerQuizContainer();
const { listenerAnswerQuizController, listenerAnswerQuizService,listenerAnswerQuizRepository } = listenerAnswerQuizContainer.export();
export { listenerAnswerQuizController, listenerAnswerQuizService, listenerAnswerQuizRepository };