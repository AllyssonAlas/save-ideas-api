import { HttpRequest, HttpResponse } from '@/presentation/protocols';

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name'),
      };
    }

    return {
      statusCode: 400,
      body: new Error('Missing param: email'),
    };
  }
}
