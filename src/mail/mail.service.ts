// src/mail/mail.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as SibApiV3Sdk from '@sendinblue/client';

@Injectable()
export class MailService {
  private brevoClient: SibApiV3Sdk.TransactionalEmailsApi;

  constructor() {
    this.brevoClient = new SibApiV3Sdk.TransactionalEmailsApi();
    this.brevoClient.setApiKey(
      SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY!, // tu api key desde .env
    );
  }

  async sendMail(to: string, subject: string, htmlContent: string) {
    try {
      const senderEmail = process.env.BREVO_SENDER_EMAIL;
      const senderName = process.env.BREVO_SENDER_NAME;

      const sendSmtpEmail = {
        sender: { email: senderEmail, name: senderName },
        to: [{ email: to }],
        subject,
        htmlContent,
      };

      const response = await this.brevoClient.sendTransacEmail(sendSmtpEmail);
      return response;
    } catch (error) {
      console.error('Error enviando correo:', error);
      throw new InternalServerErrorException('No se pudo enviar el correo');
    }
  }
}
