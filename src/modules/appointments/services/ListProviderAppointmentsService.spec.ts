import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the appointment on a specific day', async () => {
    const appointment01 = await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      provider_id: 'provider_id',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointment02 = await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      provider_id: 'provider_id',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider_id',
      day: 20,
      year: 2020,
      month: 5,
    });

    expect(appointments).toEqual([appointment01, appointment02]);
  });
});
