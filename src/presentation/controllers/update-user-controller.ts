import { LoadUser, UpdateUser } from '@/domain/usecases';
import { Controller, Validation, HttpResponse } from '@/presentation/protocols';
import { EmailInUseError, InvalidParamError } from '@/presentation/errors';
import { badRequest, forbidden, noContent, serverError } from '@/presentation/helpers';

export class UpdateUserController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadUser: LoadUser,
    private readonly updateUpdate: UpdateUser,
  ) {}

  async handle(request: UpdateUserController.Request): Promise<HttpResponse> {
    try {
      const { name, email, password, newPassword } = request;

      const error = this.validation.validate(request);

      if (error) {
        const optionalFields = ['password', 'newPassword', 'newPasswordConfirmation'];
        const requestFields = Object.keys(request);
        const hasOptionalFields = requestFields.some((field) => optionalFields.includes(field));
        const hasOptionalFieldError = optionalFields.some((field) => error.message.includes(field));
        if (
          (hasOptionalFields && hasOptionalFieldError) ||
          (!hasOptionalFields && !hasOptionalFieldError)
        ) {
          return badRequest(error);
        }
      }
      const userData = await this.loadUser.perform({ id: request.userId });
      if (!userData) {
        return forbidden(new InvalidParamError('id'));
      }
      const userNewData = {
        id: userData.id,
        name,
        email,
        password,
        passwordHash: userData.password,
        newPassword,
      };
      const { success, invalidField } = await this.updateUpdate.perform(userNewData);
      if (!success && invalidField === 'password') {
        return forbidden(new InvalidParamError('password'));
      } else if (!success && invalidField === 'email') {
        return forbidden(new EmailInUseError());
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
