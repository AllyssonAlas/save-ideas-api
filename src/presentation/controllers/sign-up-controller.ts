import { SignUp } from '@/domain/usecases';
import { HttpRequest, HttpResponse, Controller, Validation } from '@/presentation/protocols';
import { EmailInUseError } from '@/presentation/errors';
import { badRequest, serverError, noContent, forbidden } from '@/presentation/helpers';

export class SignUpController implements Controller {
  constructor(private readonly validation: Validation, private readonly signUp: SignUp) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) return badRequest(error);
      const { name, email, password } = httpRequest.body;
      const isUserValid = await this.signUp.perform({ name, email, password });
      if (!isUserValid) return forbidden(new EmailInUseError());
      return noContent();
    } catch (error) {
      return serverError();
    }
  }
}
