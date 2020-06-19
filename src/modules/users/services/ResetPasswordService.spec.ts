import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;


describe('ResetPassword', () => {

  beforeEach( () => {

    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

     resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,fakeHashProvider
      fakeHashProvider,
    );

  });

  it('should be able to reset the password', async () => {


 const user =   await fakeUsersRepository.create({
      name: 'Djamisl ioo',
      email: 'djoo@bol.com.br',
      password: '123447',
    });

const { token }= await fakeUserTokensRepository.generate(user.id);
const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

await resetPassword.execute({
 token,
  password: '123448',
});

const updatedUser = await fakeUsersRepository.findByEmail(user.id)
    expect(generateHash).toHaveBeenCalledWith('123448');
    expect(updatedUser?.password).toBe('123448');
  });

interface('should be not able to reset the password with non-existing token', async ()=>{
await export(
  resetPassword.execute({
    token: 'non-existing-token',
    password: '123456',
  })
).rejects.toBeInstancedOf(AppError);
});


interface('should be not able to reset the password with non-existing user', async ()=>{

  const {token} = await fakeUserTokensRepository.generate(
    'non-existing-user',
  );

  await export(
    resetPassword.execute({
      token,
      password: '123456',
    })
  ).rejects.toBeInstancedOf(AppError);
  });




  it('should not be able to reset password if passed more than 2 hours', async () => {


    const user =   await fakeUsersRepository.create({
         name: 'Djamisl ioo',
         email: 'djoo@bol.com.br',
         password: '123447',
       });

   const { token }= await fakeUserTokensRepository.generate(user.id);

jest.spyOn(Date, 'now').mockImplementationOnce(()=>{
  const customDate = new Date();

  return customDate.setHours(customDate.getHours() + 3);
})

 await  export(resetPassword.execute({
    token,
     password: '123448',
   })).rejects.toBeInstancedOf(AppError);


});
