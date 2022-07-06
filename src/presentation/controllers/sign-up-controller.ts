import { SignUp } from '@/domain/usecases';
import {
  HttpRequest,
  HttpResponse,
  Controller,
  EmailValidator,
  Validation,
} from '@/presentation/protocols';
import { InvalidParamError, EmailInUseError } from '@/presentation/errors';
import { badRequest, serverError, noContent, forbidden } from '@/presentation/helpers';

export class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly signUp: SignUp,
    private readonly validation: Validation,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) return badRequest(error);
      const { name, email, password, passwordConfirmation } = httpRequest.body;
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }
      const isEmailValid = this.emailValidator.isValid(email);
      if (!isEmailValid) return badRequest(new InvalidParamError('email'));
      const isUserValid = await this.signUp.perform({ name, email, password });
      if (!isUserValid) return forbidden(new EmailInUseError());
      return noContent();
    } catch (error) {
      return serverError();
    }
  }
}
