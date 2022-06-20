import { HttpRequest, HttpResponse } from '@/presentation/protocols';
import { MissingParamError } from '@/presentation/errors';

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name'),
      };
    }

    return {
      statusCode: 400,
      body: new MissingParamError('email'),
    };
  }
}
