import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UserEntity } from "src/domain/entities/user.entity";
import { ErrorCodes } from "src/domain/exceptions/error-codes.enum";
import { UserRepository } from "src/infra/database/repositories/user-repository/user.repository";
import { RedisService } from "src/infra/redis/redis.service";
import { ValidateVerificationCodeDto } from "src/modules/accounts/signup/services/validate-verification-code/validate-verification-code.dto";

@Injectable()
export class ValidateVerificationCodeService {
  constructor(
    private readonly redisSerivce: RedisService,
    private readonly userRepository: UserRepository,
  ) {}

  async execute({ code, email }: ValidateVerificationCodeDto) {
    const redisKey = `verification-code:${email}`;
    const storedCode = await this.redisSerivce.get(redisKey);

    if (!storedCode) {
      throw new BadRequestException("Code expired", {
        description: ErrorCodes.VERIFICATION_CODE_EXPIRED,
      });
    }

    if (storedCode !== code) {
      throw new BadRequestException("Code is incorrect", {
        description: ErrorCodes.VERIFICATION_CODE_INCORRECT,
      });
    }

    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new NotFoundException("User not found", {
        description: ErrorCodes.EMAIL_NOT_FOUND,
      });
    }

    await this.userRepository.updateById(user.id, { emailValidated: true });
    await this.redisSerivce.del(redisKey);

    return {
      ...user,
      emailValidated: true,
    } as UserEntity;
  }
}
