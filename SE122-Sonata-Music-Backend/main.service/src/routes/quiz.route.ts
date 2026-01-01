import { quizController } from '@/container/quiz.container';
import { QuizAnswerReq } from '@/dto/quiz/request/quiz-answer.req';
import { QuizUpdateReq } from '@/dto/quiz/request/quiz-update.req';
import { RoleCodeEnum } from '@/enums/role-code.enum';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { checkRole } from '@/middleware/check-role.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const quizRouter = express.Router();

quizRouter

  .delete(
    '/:id',
    authenticateJWT,
    checkRole([RoleCodeEnum.ADMIN]),
    quizController.common.delete.bind(quizController.common)
  )

  .post(
    '/answer/:id',
    authenticateJWT,
    checkRole([RoleCodeEnum.LISTENER]),
    classValidate(QuizAnswerReq),
    quizController.answerQuiz.bind(quizController)
  )

  .post(
    '/search',
    authenticateJWT,
    checkRole([RoleCodeEnum.ADMIN]),
    quizController.common.searchBase.bind(quizController.common)
  )

  .put(
    '/:id',
    authenticateJWT,
    checkRole([RoleCodeEnum.ADMIN]),
    classValidate(QuizUpdateReq),
    quizController.updateById.bind(quizController)
  )

  .get(
    '/unanswered/:musicId',
    authenticateJWT,
    checkRole([RoleCodeEnum.LISTENER]),
    quizController.getUnansweredQuizzesByMusicId.bind(quizController)
  )

  .get('/:id', quizController.getById.bind(quizController));

export default quizRouter;
