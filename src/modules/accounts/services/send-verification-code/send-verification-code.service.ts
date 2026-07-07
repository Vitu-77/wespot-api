import { randomInt } from 'node:crypto'
import { Injectable } from '@nestjs/common'
import { env } from 'src/env'
import { EmailService } from 'src/infra/email/email.service'
import { createVerificationCodeEmail } from 'src/infra/email/templates/verification-code-template'
import { RedisService } from 'src/infra/redis/redis.service'

type Params = {
  email: string
  name: string
}

@Injectable()
export class SendVerificationCodeService {
  private codeValidationInSeconds = 60 * 60

  constructor(
    private readonly emailService: EmailService,
    private readonly redisSerivce: RedisService,
  ) {}

  async execute({ email, name }: Params) {
    const code = randomInt(1111, 9999)
    await this.redisSerivce.set(
      `verification-code:${email}`,
      String(code),
      this.codeValidationInSeconds,
    )

    return this.emailService.send({
      title: 'Código de verificação',
      to: [email],
      fromMail: env.SUPPORT_EMAIL_SENDER,
      fromName: 'WeSpot',
      content: createVerificationCodeEmail({
        code,
        username: name,
        codeValidationInSeconds: this.codeValidationInSeconds,
      }),
    })
  }
}
