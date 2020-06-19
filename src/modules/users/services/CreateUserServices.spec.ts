import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new appointment', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Djamisl ioo',
      email: 'djoo@bol.com.br',
      password: '12344',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user whith same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Djamisl ioo',
      email: 'djoo@bol.com.br',
      password: '12344',
    });

    expect(
      createUser.execute({
        name: 'Djamisl ioo',
        email: 'djoo@bol.com.br',
        password: '12344',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});