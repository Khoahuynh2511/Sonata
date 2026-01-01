import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { QuizFeedback } from '@/models/quiz_feedback.model';
import { IQuizFeedbackService } from '@/service/interface/i.quiz_feedback.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class QuizFeedbackController {
  public common: IBaseCrudController<QuizFeedback>;
  private quizFeedbackService: IQuizFeedbackService<QuizFeedback>;
  constructor(
    @inject('QuizFeedbackService') quizFeedbackService: IQuizFeedbackService<QuizFeedback>,
    @inject(ITYPES.Controller) common: IBaseCrudController<QuizFeedback>
  ) {
    this.quizFeedbackService = quizFeedbackService;
    this.common = common;
  }
}
