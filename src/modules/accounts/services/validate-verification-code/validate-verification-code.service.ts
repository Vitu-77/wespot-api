import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from 'src/domain/entities/user.entity';
import { ErrorCodes } from 'src/domain/exceptions/error-codes.enum';
import { RedisService } from 'src/infra/redis/redis.service';
import { GetUserByEmailRepository } from 'src/modules/accounts/repositories/get-user-by-email.repository';
import { UpdateUserRepository } from 'src/modules/accounts/repositories/update-user.repository';
import { ValidateVerificationCodeDto } from 'src/modules/accounts/services/validate-verification-code/validate-verification-code.dto';

@Injectable()
export class ValidateVerificationCodeService {
  constructor(
    private readonly redisSerivce: RedisService,
    private readonly getUserByEmailRepository: GetUserByEmailRepository,
    private readonly updateUserRepository: UpdateUserRepository,
  ) {}

  async execute({ code, email }: ValidateVerificationCodeDto) {
    const redisKey = `verification-code:${email}`;
    const storedCode = await this.redisSerivce.get(redisKey);

    if (!storedCode) {
      throw new BadRequestException('Code expired', {
        description: ErrorCodes.VERIFICATION_CODE_EXPIRED,
      });
    }

    if (storedCode !== code) {
      throw new BadRequestException('Code is incorrect', {
        description: ErrorCodes.VERIFICATION_CODE_INCORRECT,
      });
    }

    const user = await this.getUserByEmailRepository.execute(email);

    if (!user) {
      throw new NotFoundException('User not found', {
        description: ErrorCodes.EMAIL_NOT_FOUND,
      });
    }

    await this.updateUserRepository.execute(user.id, { emailValidated: true });
    await this.redisSerivce.del(redisKey);

    return {
      ...user,
      emailValidated: true,
    } as UserEntity;
  }
}
