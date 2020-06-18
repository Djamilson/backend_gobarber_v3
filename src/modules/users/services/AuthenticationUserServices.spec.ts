import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Dja jldjlaj',
      email: 'djoo@bol.com.br',
      password: '12344',
    });

    const res = await authenticateUser.execute({
      email: 'djoo@bol.com.br',
      password: '12344',
    });

    expect(res).toHaveProperty('token');
    expect(res.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUser.execute({
        email: 'djoo@bol.com.br',
        password: '12344',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Dja jldjlaj',
      email: 'djoo@bol.com.br',
      password: '12344',
    });

    expect(
      authenticateUser.execute({
        email: 'djoo@bol.com.br',
        password: '912344',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
