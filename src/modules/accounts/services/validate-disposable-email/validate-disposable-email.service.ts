import { BadRequestException, Injectable } from '@nestjs/common';
import { isTemporaryEmail } from 'tempemailvalidator';
import { ErrorCodes } from 'src/domain/exceptions/error-codes.enum';

@Injectable()
export class ValidateDisposableEmailService {
  async execute(email: string) {
    const isTemporary = await isTemporaryEmail(email);

    if (isTemporary) {
      throw new BadRequestException('Provided email is disposable', {
        description: ErrorCodes.DISPOSABLE_EMAIL_NOT_ALLOWED,
      });
    }
  }
}
