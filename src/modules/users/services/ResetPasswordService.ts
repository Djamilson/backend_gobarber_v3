import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

//import User from '../infra/typeorm/entities/User';
import IUserTokensRepository from '../repositories/IUserTokensRepository'

import IUsersRepository from '../repositories/IUsersRepository';
import usersRouter from '../infra/http/routes/users.routes';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

  ) {}

  public async execute(token, password}: IRequest): Promise<void> {

    const userToken  = await this.userTokensRepository.findByToken(token);

    if (!userToken){
      throw  AppError('User token does not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    if (!user){
      throw  AppError('User token does not exists');
    }

    user.password = password;
    await this.usersRepository.save(use);
     }
}

export default ResetPasswordService;
