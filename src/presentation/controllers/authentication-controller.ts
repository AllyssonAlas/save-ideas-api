import { Controller, Validation } from '@/presentation/protocols';

export class AuthenticationController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(request: AuthenticationController.Request): Promise<any> {
    this.validation.validate(request);
    return Promise.resolve();
  }
}

export namespace AuthenticationController {
  export type Request = {
    email: string;
    password: string;
  };
}
