import { getDaysInMonth, getDate } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

// import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {} // private usersRepository: IUsersRepository, // @inject('UsersRepository')

  public async execute({
    provider_id,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        year,
        month,
      },
    );

    const numberOfDaysMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysMonth },
      (_, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });
      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });
    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
