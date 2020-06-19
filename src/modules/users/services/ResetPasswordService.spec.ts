import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;


describe('SendForgotPasswordEmail', () => {

  beforeEach( () => {

    fakeUsersRepository = new FakeUsersRepository();
     fakeUserTokensRepository = new FakeUserTokensRepository();

     resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
    );

  });

  it('should be able to reset the password', async () => {


 const user =   await fakeUsersRepository.create({
      name: 'Djamisl ioo',
      email: 'djoo@bol.com.br',
      password: '123447',
    });

const { token }= await fakeUserTokensRepository.generate(user.id);

await resetPassword.execute({
 token,
  password: '123448',
});

const updatedUser = await fakeUsersRepository.findByEmail(user.id)

    expect(updatedUser?.password).toHaveBeenCalled('123448');
  });


});
