import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ErrorCodes } from 'src/domain/exceptions/error-codes.enum'
import { ArgonService } from 'src/infra/argon/argon.service'
import { UserRepository } from 'src/infra/database/repositories/user-repository/user.repository'

import { CreateSessionService } from 'src/modules/auth/services/create-session/create-session.service'
import { SigninWithEmailDto } from 'src/modules/auth/services/signin-with-email/signin-with-email.dto'

@Injectable()
export class SigninWithEmailService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly createSessionService: CreateSessionService,
    private readonly argonService: ArgonService,
  ) {}

  async execute({ email, password }: SigninWithEmailDto) {
    const user = await this.userRepository.getByEmail(email)

    if (!user) {
      throw new NotFoundException('User not found with this email', {
        description: ErrorCodes.EMAIL_NOT_FOUND,
      })
    }

    if (user.authProvider === 'GOOGLE') {
      return this.createSessionService.execute(user)
    }

    const userPassword = user.password as string
    const passwordMatch = await this.argonService.compareHash(
      userPassword,
      password,
    )

    if (!passwordMatch) {
      throw new UnauthorizedException('Password do not match', {
        description: ErrorCodes.PASSWORDS_DO_NOT_MATCH,
      })
    }

    return this.createSessionService.execute(user)
  }
}
