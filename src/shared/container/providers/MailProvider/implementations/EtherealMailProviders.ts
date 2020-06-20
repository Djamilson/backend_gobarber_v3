import nodemailer,{ Tranporter } from 'nodemailer';
import {inject, injectable} from 'tsyringe';
import ISendMailDTO from '../dtos/ISendMailDTO';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IMailProvider from '../models/IMailProvider';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailtemplateProvider: IMailTemplateProvider,
  ){
      nodemailer.createTestAccount().then(
      account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      });
  }

  public async sendMail({to, subject, from, templateData}: ISendMailProvider): Promise<void>{
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'equipe@gobarber.com.br',
      },
      to:{
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailtemplateProvider.parse(templateData),
    });

    console.log('Message send: %s', message.messageId)
  }
}
