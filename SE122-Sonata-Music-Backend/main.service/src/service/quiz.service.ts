import { QuizAnswerReq } from '@/dto/quiz/request/quiz-answer.req';
import { QuizUpdateReq } from '@/dto/quiz/request/quiz-update.req';
import { QuizAnswerRes } from '@/dto/quiz/response/quiz-answer.res';
import { QuizAnswerException } from '@/exceptions/quiz/quiz-answer.exception';
import { Listener } from '@/models/listener.model';
import { ListenerAnswerQuiz } from '@/models/listener_answer_quiz.model';
import { Quiz } from '@/models/quiz.model';
import { IListenerRepository } from '@/repository/interface/i.listener.repository';
import { IListenerAnswerQuizRepository } from '@/repository/interface/i.listener_answer_quiz.repository';
import { IQuizRepository } from '@/repository/interface/i.quiz.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IQuizService } from '@/service/interface/i.quiz.service';
import DefinedError from '@/utils/error/defined.error';
import { inject, injectable } from 'inversify';

@injectable()
export class QuizService extends BaseCrudService<Quiz> implements IQuizService<Quiz> {
  private quizRepository: IQuizRepository<Quiz>;
  private listenerAnswerQuizRepository: IListenerAnswerQuizRepository<ListenerAnswerQuiz>;
  private listenerRepository: IListenerRepository<Listener>;

  constructor(
    @inject('QuizRepository') quizRepository: IQuizRepository<Quiz>,
    @inject('ListenerAnswerQuizRepository')
    listenerAnswerQuizRepository: IListenerAnswerQuizRepository<ListenerAnswerQuiz>,
    @inject('ListenerRepository') listenerRepository: IListenerRepository<Listener>
  ) {
    super(quizRepository);
    this.quizRepository = quizRepository;
    this.listenerAnswerQuizRepository = listenerAnswerQuizRepository;
    this.listenerRepository = listenerRepository;
  }

  async getById(id: number): Promise<Quiz | null> {
    return await this.quizRepository.findOne({
      filter: { id },
      select: {
        id: true,
        content: true,
        answerA: true,
        answerB: true,
        answerC: true,
        answerD: true,
        createAt: true,
        updateAt: true
      }
    });
  }

  async getUnansweredQuizzesByMusicId(musicId: number, listenerId: number): Promise<Quiz[]> {
    return await this.quizRepository.getUnansweredQuizzesByMusicId(listenerId, musicId);
  }

  async updateById(id: number, data: QuizUpdateReq): Promise<void> {
    const quiz = await this.quizRepository.findOne({
      filter: { id }
    });

    if (!quiz) {
      return;
    }

    quiz.content = data.content ?? quiz.content;
    quiz.answerA = data.answerA ?? quiz.answerA;
    quiz.answerB = data.answerB ?? quiz.answerB;
    quiz.answerC = data.answerC ?? quiz.answerC;
    quiz.answerD = data.answerD ?? quiz.answerD;
    quiz.correctAnswer = data.correctAnswer ?? quiz.correctAnswer;

    await this.quizRepository.save(quiz);
  }

  async answerQuiz(id: number, listenerId: number, data: QuizAnswerReq): Promise<QuizAnswerRes> {
    // Get the quiz by ID
    const quiz = await this.quizRepository.findOne({
      filter: { id }
    });
    if (!quiz) {
      throw new DefinedError(QuizAnswerException.QUIZ_ANSWER_NotFound);
    }

    // Check if the listener has already answered this quiz
    const existingAnswer = await this.listenerAnswerQuizRepository.findOne({
      filter: { listenerId, quizId: quiz.id }
    });
    if (existingAnswer) {
      throw new DefinedError(QuizAnswerException.QUIZ_ANSWER_AlreadyExists);
    }

    // Check if the answer is correct
    const isCorrect = quiz.correctAnswer === data.answer;

    if (isCorrect) {
      // Create a new ListenerAnswerQuiz entry
      const listenerAnswerQuiz = new ListenerAnswerQuiz();
      listenerAnswerQuiz.listenerId = listenerId;
      listenerAnswerQuiz.quizId = quiz.id;

      // Save the answer
      await this.listenerAnswerQuizRepository.save(listenerAnswerQuiz);

      // Increase the listener's points
      await this.listenerRepository.incrementPoints(listenerId, 1);

      return {
        result: true,
        message: 'Correct answer'
      };
    }

    // If the answer is incorrect, return a message
    return {
      result: false,
      message: 'Incorrect answer'
    };
  }
}
