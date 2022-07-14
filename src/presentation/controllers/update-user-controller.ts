import { LoadUser, UpdateUser } from '@/domain/usecases';
import { Controller, Validation } from '@/presentation/protocols';
import { InvalidParamError } from '@/presentation/errors';
import { badRequest, forbidden, noContent, serverError } from '@/presentation/helpers';

export class UpdateUserController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadUser: LoadUser,
    private readonly updateUpdate: UpdateUser,
  ) {}

  async handle(request: UpdateUserController.Request): Promise<any> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      const userData = await this.loadUser.perform({ id: request.id });
      if (!userData) {
        return forbidden(new InvalidParamError('id'));
      }
      const userNewData = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        password: request.password,
        passwordHash: userData.password,
        newPassword: request.newPassword,
      };

      const { wasSuccessful } = await this.updateUpdate.perform(userNewData);
      if (!wasSuccessful) {
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
    id: string;
    name: string;
    email: string;
    password?: string;
    newPassword?: string;
    newPasswordConfirmation?: string;
  };
}
