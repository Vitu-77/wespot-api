import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ErrorsMap } from "src/domain/exceptions/errors.map";
import { ArgonService } from "src/infra/argon/argon.service";
import { UserRepository } from "src/infra/database/repositories/user-repository/user.repository";
import { CreateSessionUseCase } from "src/modules/accounts/signin/usecases/create-session/create-session.usecase";
import { CreateAccountWithEmailDto } from "src/modules/accounts/signup/services/create-account-with-email/create-account-with-email.dto";
import { EnsureAccountCreationUseCase } from "src/modules/accounts/signup/usecases/ensure-account-creation/ensure-account-creation.usecase";
import { SendVerificationCodeUseCase } from "src/modules/accounts/signup/usecases/send-verification-code/send-verification-code.usecase";
import { ValidateDisposableEmailUseCase } from "src/modules/accounts/signup/usecases/validate-disposable-email/validate-disposable-email.usecase";

@Injectable()
export class CreateAccountWithEmailService {
  constructor(
    private readonly argonService: ArgonService,
    private readonly createSessionUseCase: CreateSessionUseCase,
    private readonly userRepository: UserRepository,
    private readonly validateDisposableEmailUseCase: ValidateDisposableEmailUseCase,
    private readonly ensureAccountCreationUseCase: EnsureAccountCreationUseCase,
    private readonly sendVerificationCodeUseCase: SendVerificationCodeUseCase,
  ) {}

  async execute(data: CreateAccountWithEmailDto) {
    if (data.password !== data.passwordConfirmation) {
      throw new UnauthorizedException(
        CreateAccountWithEmailService.errors.PASSWORDS_DO_NOT_MATCH,
      );
    }

    await this.validateDisposableEmailUseCase.execute(data.email);

    const user = await this.userRepository.getByEmail(data.email);

    if (user) {
      if (user.authProvider === "EMAIL") {
        throw new ConflictException(
          CreateAccountWithEmailService.errors.EMAIL_ALREADY_IN_USE,
        );
      }

      if (user.authProvider === "GOOGLE") {
        throw new ConflictException(
          CreateAccountWithEmailService.errors
            .EMAIL_ALREADY_REGISTERED_WITH_GOOGLE,
        );
      }
    }

    await this.ensureAccountCreationUseCase.execute(data.fingerprintId);

    await this.sendVerificationCodeUseCase.execute({
      email: data.email,
      name: data.name,
    });

    const newUser = await this.userRepository.create({
      ...data,
      emailValidated: false,
      authProvider: "EMAIL",
      password: await this.argonService.hashString(data.password),
      fingerprint: data.fingerprintId,
    });

    return this.createSessionUseCase.execute(newUser);
  }

  static errors = {
    PASSWORDS_DO_NOT_MATCH: ErrorsMap.PASSWORDS_DO_NOT_MATCH,
    EMAIL_ALREADY_IN_USE: ErrorsMap.EMAIL_ALREADY_IN_USE,
    EMAIL_ALREADY_REGISTERED_WITH_GOOGLE:
      ErrorsMap.EMAIL_ALREADY_REGISTERED_WITH_GOOGLE,
  };
}
