import { Controller, Validation } from '@/presentation/protocols';
import { badRequest } from '@/presentation/helpers';
export class UpdateUserController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(request: UpdateUserController.Request): Promise<any> {
    const error = this.validation.validate(request);
    if (error) {
      return badRequest(error);
    }
    return Promise.resolve();
  }
}

export namespace UpdateUserController {
  export type Request = {
    id: string;
    name: string;
    email: string;
    password?: string;
    newPassword?: string;
    newPasswordConfirmation?: string;
  };
}
