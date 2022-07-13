import { Authentication, SignUp } from '@/domain/usecases';
import { HttpResponse, Controller, Validation } from '@/presentation/protocols';
import { EmailInUseError } from '@/presentation/errors';
import { badRequest, serverError, noContent, forbidden } from '@/presentation/helpers';

export class SignUpController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly signUp: SignUp,
    private readonly authentication: Authentication,
  ) {}

  async handle(request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) return badRequest(error);
      const { passwordConfirmation, ...userData } = request;
      const { wasSigned } = await this.signUp.perform(userData);
      if (!wasSigned) return forbidden(new EmailInUseError());
      await this.authentication.perform({ email: userData.email, password: userData.password });
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace SignUpController {
  export type Request = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  };
}
