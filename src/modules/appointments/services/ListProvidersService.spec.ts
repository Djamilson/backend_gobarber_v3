import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import ListProvidersService from './ListProvidersService';

let fakeCacheProvider: FakeCacheProvider;

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Djamisl ioo 1',
      email: 'djoo@bol.com.br1',
      password: '1234477',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Djamisl ioo2',
      email: 'djoo@bol.com.br2',
      password: '1234477',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Djamisl ioo 3',
      email: 'djoo@bol.com.br3',
      password: '1234477',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
