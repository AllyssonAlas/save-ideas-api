import { LoadUser, UpdateUser } from '@/domain/usecases';
import { Controller, Validation, HttpResponse } from '@/presentation/protocols';
import { InvalidParamError } from '@/presentation/errors';
import { badRequest, forbidden, noContent, serverError } from '@/presentation/helpers';

export class UpdateUserController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadUser: LoadUser,
    private readonly updateUpdate: UpdateUser,
  ) {}

  async handle(request: UpdateUserController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      const userData = await this.loadUser.perform({ id: request.userId });
      if (!userData) {
        return forbidden(new InvalidParamError('id'));
      }
      const userNewData = {
        id: userData.id,
        name: request.name,
        email: request.email,
        password: request.password,
        passwordHash: userData.password,
        newPassword: request.newPassword,
      };
      const { success } = await this.updateUpdate.perform(userNewData);
      if (!success) {
        return forbidden(new InvalidParamError('password'));
      }
      return noContent();
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
