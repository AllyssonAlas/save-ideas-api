import { HttpRequest, HttpResponse, Controller, EmailValidator } from '@/presentation/protocols';
import { MissingParamError, InvalidParamError } from '@/presentation/errors';
import { badRequest } from '@/presentation/helpers';

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  handle(httpRequest: HttpRequest): HttpResponse | any {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }

    const isEmailValid = this.emailValidator.isValid(httpRequest.body.email);

    if (!isEmailValid) return badRequest(new InvalidParamError('email'));
  }
}
