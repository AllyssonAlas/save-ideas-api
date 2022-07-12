import { Controller, Validation } from '@/presentation/protocols';
import { badRequest } from '@/presentation/helpers';

export class AuthenticationController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(request: AuthenticationController.Request): Promise<any> {
    const error = this.validation.validate(request);
    if (error) {
      return badRequest(error);
    }
    return Promise.resolve();
  }
}

export namespace AuthenticationController {
  export type Request = {
    email: string;
    password: string;
  };
}
