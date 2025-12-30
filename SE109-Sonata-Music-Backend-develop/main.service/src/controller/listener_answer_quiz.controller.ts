import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { ListenerAnswerQuiz } from '@/models/listener_answer_quiz.model';
import { IListenerAnswerQuizService } from '@/service/interface/i.listener_answer_quiz.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class ListenerAnswerQuizController {
public common: IBaseCrudController<ListenerAnswerQuiz>;
private listenerAnswerQuizService: IListenerAnswerQuizService<ListenerAnswerQuiz>;
constructor(
@inject('ListenerAnswerQuizService') listenerAnswerQuizService: IListenerAnswerQuizService<ListenerAnswerQuiz>,
@inject(ITYPES.Controller) common: IBaseCrudController<ListenerAnswerQuiz>
) {
this.listenerAnswerQuizService = listenerAnswerQuizService;
this.common = common;
}
}