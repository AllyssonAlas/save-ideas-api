import { HttpRequest, HttpResponse, Controller, EmailValidator } from '@/presentation/protocols';
import { MissingParamError, InvalidParamError } from '@/presentation/errors';
import { badRequest, serverError } from '@/presentation/helpers';

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  handle(httpRequest: HttpRequest): HttpResponse | any {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field));
      }
      const { password, passwordConfirmation, email } = httpRequest.body;
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }
      const isEmailValid = this.emailValidator.isValid(email);
      if (!isEmailValid) return badRequest(new InvalidParamError('email'));
    } catch (error) {
      return serverError();
    }
  }
}
