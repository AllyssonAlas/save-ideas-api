import { UpdateUser } from '@/domain/usecases';
import { Controller, Validation } from '@/presentation/protocols';
import { badRequest, serverError } from '@/presentation/helpers';

export class UpdateUserController implements Controller {
  constructor(private readonly validation: Validation, private readonly updateUser: UpdateUser) {}

  async handle(request: UpdateUserController.Request): Promise<any> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      await this.updateUser.perform(request);
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
