import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ErrorsMap } from "src/domain/exceptions/errors.map";
import { ArgonService } from "src/infra/argon/argon.service";
import { UserRepository } from "src/infra/database/repositories/user-repository/user.repository";
import { SigninWithEmailDto } from "src/modules/accounts/signin/services/signin-with-email/signin-with-email.dto";
import { CreateSessionUseCase } from "src/modules/accounts/signin/usecases/create-session/create-session.usecase";

@Injectable()
export class SigninWithEmailService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly createSessionUseCase: CreateSessionUseCase,
    private readonly argonService: ArgonService,
  ) {}

  async execute({ email, password }: SigninWithEmailDto) {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new NotFoundException(
        SigninWithEmailService.errors.EMAIL_NOT_FOUND,
      );
    }

    if (user.authProvider === "GOOGLE") {
      return this.createSessionUseCase.execute(user);
    }

    const userPassword = user.password as string;
    const passwordMatch = await this.argonService.compareHash(
      userPassword,
      password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException(
        SigninWithEmailService.errors.PASSWORDS_DO_NOT_MATCH,
      );
    }

    return this.createSessionUseCase.execute(user);
  }

  static errors = {
    EMAIL_NOT_FOUND: ErrorsMap.EMAIL_NOT_FOUND,
    PASSWORDS_DO_NOT_MATCH: ErrorsMap.PASSWORDS_DO_NOT_MATCH,
  };
}
