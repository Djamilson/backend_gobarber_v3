import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

//import User from '../infra/typeorm/entities/User';
import IUserTokensRepository from '../repositories/IUserTokensRepository'

import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import usersRouter from '../infra/http/routes/users.routes';
interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

  ) {}

  public async execute({email}: IRequest): Promise<void> {
    const userExists = await this.usersRepository.findByEmail(email);
    if (!userExists){
      throw new AppError('User does not exists.');
    }
    const {token } = await this.userTokensRepository.generate(userExists.id);

    await this.mailProvider.sendMail(
      {
        to:{
          name: usersRouter.name,
          email: usersRouter.email,
        },
        subject: '[GoBarber] Recuperação de senha',
        templateData:{
          template: 'Óla, {{name}}: {{token}}',
          variables:{
            name: usersRouter.name,
            token,
          }

        }
      })

  }
}

export default SendForgotPasswordEmailService;
