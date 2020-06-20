import { Router } from 'express';
import { container } from 'tsyringe';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();


forgotPasswordController.post('/forgot', forgotPasswordController.create);
resetPasswordController.post('/reset', resetPasswordController.create);

export default passwordRouter;
