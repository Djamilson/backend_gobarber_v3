import { Request, Response } from 'express';
import { container } from 'tsyringe';

//import CreateUserService from '@modules/users/services/CreateUserService';
//import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const authenticateUser = container.resolve(AuthenticateUserService);

      const {user, token} = await authenticateUser.execute({ email, password });

      delete user.password;

      return res.json(user, token);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  /*
  public async update(req: Request, res: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });

    delete user.password;

    return res.json(user);
  }*/
}
