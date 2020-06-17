import { Router } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AuthenticationUserService from '@modules/users/services/AuthenticationUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const usersRepository = new UsersRepository();

  const authenticanteUser = new AuthenticationUserService(usersRepository);
  // await authenticanteUser.execute({ email, password });

  const { user, token } = await authenticanteUser.execute({
    email,
    password,
  });
  delete user.password;

  return res.json({ user, token });
});

export default sessionsRouter;
