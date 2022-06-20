import { HttpRequest, HttpResponse } from '@/presentation/protocols';
import { MissingParamError } from '@/presentation/errors';
import { badRequest } from '@/presentation/helpers';

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'));
    }

    return badRequest(new MissingParamError('email'));
  }
}
