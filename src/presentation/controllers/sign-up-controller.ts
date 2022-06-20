import { HttpRequest, HttpResponse, Controller } from '@/presentation/protocols';
import { MissingParamError } from '@/presentation/errors';
import { badRequest } from '@/presentation/helpers';

export class SignUpController implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse | any {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
  }
}
