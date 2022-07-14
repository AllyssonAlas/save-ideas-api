import { LoadUser } from '@/domain/usecases';
import { Controller, Validation } from '@/presentation/protocols';
import { badRequest, serverError } from '@/presentation/helpers';

export class UpdateUserController implements Controller {
  constructor(private readonly validation: Validation, private readonly loadUser: LoadUser) {}

  async handle(request: UpdateUserController.Request): Promise<any> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      await this.loadUser.perform({ id: request.id });
    } catch (error) {
      return serverError(error);
    }
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
