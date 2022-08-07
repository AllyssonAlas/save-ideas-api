import { Controller, Validation } from '@/presentation/protocols';

export class UpdateUserController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(request: UpdateUserController.Request): Promise<any> {
    this.validation.validate(request);
    return Promise.resolve();
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
