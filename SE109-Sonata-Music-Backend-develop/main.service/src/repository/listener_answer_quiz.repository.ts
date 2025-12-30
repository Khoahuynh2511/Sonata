import { ListenerAnswerQuiz } from '@/models/listener_answer_quiz.model';
import { BaseRepository } from '@/repository/base/base.repository';
import { IListenerAnswerQuizRepository } from '@/repository/interface/i.listener_answer_quiz.repository';
import { ITYPES } from '@/types/interface.types';
import { inject } from 'inversify';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export class ListenerAnswerQuizRepository extends BaseRepository<ListenerAnswerQuiz> implements IListenerAnswerQuizRepository<ListenerAnswerQuiz> {
constructor(@inject(ITYPES.Datasource) dataSource: DataSource) {
super(dataSource.getRepository(ListenerAnswerQuiz));
}
}