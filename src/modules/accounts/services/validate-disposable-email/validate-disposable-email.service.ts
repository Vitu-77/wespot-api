import { BadRequestException, Injectable } from '@nestjs/common'
import { ErrorCodes } from 'src/domain/exceptions/error-codes.enum'
import { isTemporaryEmail } from 'tempemailvalidator'

@Injectable()
export class ValidateDisposableEmailService {
  async execute(email: string) {
    const isTemporary = await isTemporaryEmail(email)

    if (isTemporary) {
      throw new BadRequestException('Provided email is disposable', {
        description: ErrorCodes.DISPOSABLE_EMAIL_NOT_ALLOWED,
      })
    }
  }
}
