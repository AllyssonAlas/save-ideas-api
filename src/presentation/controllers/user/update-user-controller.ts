import { Controller, Validation } from '@/presentation/protocols';
import { serverError } from '@/presentation/helpers';

export class UpdateUserController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(request: UpdateUserController.Request): Promise<any> {
    try {
      this.validation.validate(request);
      return Promise.resolve();
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace UpdateUserController {
  export type Request = {
    userId: string;
    name: string;
    email: string;
    password?: string;
    newPassword?: string;
    newPasswordConfirmation?: string;
  };
}
