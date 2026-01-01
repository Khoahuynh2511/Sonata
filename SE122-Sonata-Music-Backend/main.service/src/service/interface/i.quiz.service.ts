import { QuizAnswerReq } from '@/dto/quiz/request/quiz-answer.req';
import { QuizUpdateReq } from '@/dto/quiz/request/quiz-update.req';
import { QuizAnswerRes } from '@/dto/quiz/response/quiz-answer.res';
import { Quiz } from '@/models/quiz.model';
import { IBaseCrudService } from '@/service/interface/i.base.service';
import { BaseModelType } from '@/types/base-model.types';

export interface IQuizService<T extends BaseModelType> extends IBaseCrudService<T> {
  updateById(id: number, data: QuizUpdateReq): Promise<void>;
  answerQuiz(id: number, listenerId: number, data: QuizAnswerReq): Promise<QuizAnswerRes>;
  getUnansweredQuizzesByMusicId(musicId: number, listenerId: number): Promise<Quiz[]>;
  getById(id: number): Promise<Quiz | null>;
}
