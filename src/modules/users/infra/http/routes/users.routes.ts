import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import UserAvatarController from '../controllers/UserAvatarController';
import UsersController from '../controllers/UsersController';
import ensureAuthenticated from '../middleware/ensureAuthenticanted';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('file'),
  userAvatarController.update,
);
export default usersRouter;
