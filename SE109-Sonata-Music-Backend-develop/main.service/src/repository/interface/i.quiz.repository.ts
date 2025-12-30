import { Quiz } from '@/models/quiz.model';
import { IBaseRepository } from '@/repository/interface/i.base.repository';

export interface IQuizRepository<T> extends IBaseRepository<T> {
  getUnansweredQuizzesByMusicId(listenerId: number, musicId: number): Promise<Quiz[]>;
}
