import { contributorController } from '@/container/contributor.container';
import { ContributorExchangePremiumReq } from '@/dto/contributor/request/contributor-exchange-premium.req';
import { ContributorLoginReq } from '@/dto/contributor/request/contributor-login.req';
import { ContributorRegisterReq } from '@/dto/contributor/request/contributor-register.req';
import { ContributorUpdateReq } from '@/dto/contributor/request/contributor-update.req';
import { RoleCodeEnum } from '@/enums/role-code.enum';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { checkRole } from '@/middleware/check-role.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import express from 'express';
const contributorRouter = express.Router();

contributorRouter

  .delete(
    '/:id',
    authenticateJWT,
    checkRole([RoleCodeEnum.ADMIN]),
    contributorController.delete.bind(contributorController)
  )

  .put(
    '/:id',
    authenticateJWT,
    checkRole([RoleCodeEnum.ADMIN]),
    classValidate(ContributorUpdateReq),
    contributorController.update.bind(contributorController)
  )

  .post(
    '/exchange-premium',
    authenticateJWT,
    checkRole([RoleCodeEnum.CONTRIBUTOR]),
    classValidate(ContributorExchangePremiumReq),
    contributorController.exchangePremium.bind(contributorController)
  )

  .post(
    '/search',
    authenticateJWT,
    checkRole([RoleCodeEnum.ADMIN]),
    contributorController.search.bind(contributorController)
  )

  .get('/activate/email', contributorController.activateEmail.bind(contributorController).bind(contributorController))

  .post('/register', classValidate(ContributorRegisterReq), contributorController.register.bind(contributorController))

  .post('/login', classValidate(ContributorLoginReq), contributorController.login.bind(contributorController))

  .get('/me', authenticateJWT, contributorController.getMe.bind(contributorController))

  .get(
    '/:id',
    authenticateJWT,
    checkRole([RoleCodeEnum.ADMIN]),
    contributorController.getById.bind(contributorController)
  );

export default contributorRouter;
