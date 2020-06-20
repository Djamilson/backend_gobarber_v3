import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticationUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  const authenticanteUser = container.resolve(AuthenticationUserService);

  const { user, token } = await authenticanteUser.execute({
    email,
    password,
  });
  delete user.password;

  return res.json({ user, token });
});

export default sessionsRouter;
