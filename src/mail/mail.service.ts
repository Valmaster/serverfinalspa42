import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation() {
    const url = `lol`;

    await this.mailerService.sendMail({
      to: 'petit.valentin.95@hotmail.com',
      from: 'valentin.petit.95@hotmail.fr', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      text: 'Coucou',
      context: {
        // ✏️ filling curly brackets with content
        url,
      },
    });
  }
}
