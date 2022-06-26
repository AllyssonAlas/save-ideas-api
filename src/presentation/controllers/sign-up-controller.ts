import { SignUp } from '@/domain/usecases';
import { HttpRequest, HttpResponse, Controller, EmailValidator } from '@/presentation/protocols';
import { MissingParamError, InvalidParamError, EmailInUseError } from '@/presentation/errors';
import { badRequest, serverError, noContent, forbidden } from '@/presentation/helpers';

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator, private readonly signUp: SignUp) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field));
      }
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