import { artistFollowerController } from '@/container/artist_follower.container';
import { RoleCodeEnum } from '@/enums/role-code.enum';
import { authenticateJWT } from '@/middleware/authenticate.middleware';
import { checkRole } from '@/middleware/check-role.middleware';
import express from 'express';
const artistFollowerRouter = express.Router();

artistFollowerRouter

  .get(
    '/is-followed/:artistId',
    authenticateJWT,
    checkRole([RoleCodeEnum.LISTENER]),
    artistFollowerController.isMyFollowedArtist.bind(artistFollowerController)
  )

  .post(
    '/unfollow',
    authenticateJWT,
    checkRole([RoleCodeEnum.LISTENER]),
    artistFollowerController.unFollowArtist.bind(artistFollowerController)
  )

  .post(
    '/me',
    authenticateJWT,
    checkRole([RoleCodeEnum.LISTENER]),
    artistFollowerController.myFollowedArtist.bind(artistFollowerController)
  )

  .post(
    '/follow',
    authenticateJWT,
    checkRole([RoleCodeEnum.LISTENER]),
    artistFollowerController.followArtist.bind(artistFollowerController)
  );

export default artistFollowerRouter;
