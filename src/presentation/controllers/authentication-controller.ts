import { Authentication } from '@/domain/usecases';
import { Controller, Validation } from '@/presentation/protocols';
import { badRequest, serverError, unauthorized } from '@/presentation/helpers';

export class AuthenticationController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly authentication: Authentication,
  ) {}

  async handle(request: AuthenticationController.Request): Promise<any> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      const isValid = await this.authentication.perform(request);
      if (!isValid) {
        return unauthorized();
      }
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
