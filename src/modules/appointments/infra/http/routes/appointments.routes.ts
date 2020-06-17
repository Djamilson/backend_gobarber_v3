import { parseISO } from 'date-fns';
import { Router } from 'express';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticanted';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);
/*
appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return res.json(appointments);
}); */

appointmentsRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;

  const parseDate = parseISO(date);
  const appointmentsRepository = new AppointmentsRepository();

  const createAppointment = new CreateAppointmentService(
    appointmentsRepository,
  );

  const appointment = await createAppointment.execute({
    date: parseDate,
    provider_id,
  });
  return res.json(appointment);
});

export default appointmentsRouter;
