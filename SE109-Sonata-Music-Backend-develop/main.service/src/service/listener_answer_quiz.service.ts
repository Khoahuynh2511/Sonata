import { ListenerAnswerQuiz } from '@/models/listener_answer_quiz.model';
import { IListenerAnswerQuizRepository } from '@/repository/interface/i.listener_answer_quiz.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IListenerAnswerQuizService } from '@/service/interface/i.listener_answer_quiz.service';
import { inject, injectable } from 'inversify';

@injectable()
export class ListenerAnswerQuizService extends BaseCrudService<ListenerAnswerQuiz> implements IListenerAnswerQuizService<ListenerAnswerQuiz> {
private listenerAnswerQuizRepository: IListenerAnswerQuizRepository<ListenerAnswerQuiz>;

constructor(@inject('ListenerAnswerQuizRepository') listenerAnswerQuizRepository: IListenerAnswerQuizRepository<ListenerAnswerQuiz>) {
super(listenerAnswerQuizRepository);
this.listenerAnswerQuizRepository = listenerAnswerQuizRepository;
}
}