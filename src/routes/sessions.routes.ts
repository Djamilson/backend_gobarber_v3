import { Router } from 'express';
import AuthenticationUserService from '../services/AuthenticationUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const authenticanteUser = new AuthenticationUserService();
    await authenticanteUser.execute({ email, password });

    const { user, token } = await authenticanteUser.execute({
      email,
      password,
    });
    delete user.password;

    return res.json({ user, token });
  } catch (error) {
    return res.status(error.statusCode).json({ error: error.message });
  }
});

export default sessionsRouter;
