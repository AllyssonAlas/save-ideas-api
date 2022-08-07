import { UpdateUser } from '@/domain/usecases';
import { Controller, Validation } from '@/presentation/protocols';
import { badRequest, forbidden, serverError } from '@/presentation/helpers';
import { EmailInUseError, InvalidParamError } from '@/presentation/errors';

export class UpdateUserController implements Controller {
  constructor(private readonly validation: Validation, private readonly updateUser: UpdateUser) {}

  async handle(request: UpdateUserController.Request): Promise<any> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      const updateUserData = await this.updateUser.perform(request);
      if (updateUserData.invalidField === 'email') {
        return forbidden(new EmailInUseError());
      } else if (updateUserData.invalidField === 'password') {
        return forbidden(new InvalidParamError('password'));
      }
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
