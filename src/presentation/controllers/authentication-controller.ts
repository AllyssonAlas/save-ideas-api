import { Controller, Validation } from '@/presentation/protocols';
import { badRequest, serverError } from '@/presentation/helpers';

export class AuthenticationController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(request: AuthenticationController.Request): Promise<any> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      return Promise.resolve();
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
