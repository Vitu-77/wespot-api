import { Resend, ErrorResponse } from 'resend';

import { BadRequestException, Injectable } from '@nestjs/common';
import { env } from 'src/env';
import { ErrorCodes } from 'src/domain/exceptions/error-codes.enum';

type SendMailParams = {
  to: string[];
  title: string;
  content: string;
};

@Injectable()
export class EmailService {
  private readonly client: Resend;

  constructor() {
    this.client = new Resend(env.RESEND_API_KEY);
  }

  async send({ to, content, title }: SendMailParams) {
    let attempts = 0;
    let sent = false;
    let error: ErrorResponse | null = null;

    while (!sent && attempts <= 5) {
      const delayMs = attempts * 2 * 1000;
      await new Promise((res) => setTimeout(res, delayMs));
      const response = await this.client.emails.send({
        from: `Suporte WeSpot <${env.EMAIL_SENDER}>`,
        to,
        subject: title,
        html: content,
      });

      if (!response.error) {
        sent = true;
        return response.data;
      }

      attempts = attempts + 1;
      error = response.error;
    }

    if (error) {
      throw new BadRequestException(`Error sending email: ${error.message}`, {
        description: ErrorCodes.FAILED_TO_SEND_EMAIL,
      });
    }

    throw new BadRequestException(`Error sending email`, {
      description: ErrorCodes.FAILED_TO_SEND_EMAIL,
    });
  }
}
