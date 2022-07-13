import { Authentication } from '@/domain/usecases';
import { Controller, HttpResponse, Validation } from '@/presentation/protocols';
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers';

export class AuthenticationController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly authentication: Authentication,
  ) {}

  async handle(request: AuthenticationController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      const authenticationData = await this.authentication.perform(request);
      if (!authenticationData) {
        return unauthorized();
      }
      return ok(authenticationData);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace AuthenticationController {
  export type Request = {
    email: string;
    password: string;
  };
}
