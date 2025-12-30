import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Quiz } from '@/models/quiz.model';
import { IQuizService } from '@/service/interface/i.quiz.service';
import { ITYPES } from '@/types/interface.types';
import { getCurrentLoggedUser } from '@/utils/get-current-logged-user.util';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class QuizController {
  public common: IBaseCrudController<Quiz>;
  private quizService: IQuizService<Quiz>;
  constructor(
    @inject('QuizService') quizService: IQuizService<Quiz>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Quiz>
  ) {
    this.quizService = quizService;
    this.common = common;
  }

  /**
   * * GET /quiz/unanswered/:musicId
   */
  async getUnansweredQuizzesByMusicId(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { musicId } = req.params;
    const listener = await getCurrentLoggedUser(req);

    try {
      const quizzes = await this.quizService.getUnansweredQuizzesByMusicId(Number(musicId), listener.id);
      res.send_ok('Quizzes retrieved successfully', quizzes);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * * PUT /quiz/:id
   */
  async updateById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const data = req.body;

    try {
      await this.quizService.updateById(Number(id), data);
      res.send_ok('Quiz updated successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * * POST /quiz/answer/:id
   */
  async answerQuiz(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const listener = await getCurrentLoggedUser(req);
    const data = req.body;

    try {
      const result = await this.quizService.answerQuiz(Number(id), listener.id, data);
      res.send_ok('Quiz answered successfully', result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /quiz/:id
   */
  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    try {
      const quiz = await this.quizService.getById(Number(id));
      res.send_ok('Quiz retrieved successfully', quiz);
    } catch (error) {
      next(error);
    }
  }
}
