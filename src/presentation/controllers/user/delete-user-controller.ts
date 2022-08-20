import { DeleteUser } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols';
import { noContent, serverError } from '@/presentation/helpers';

export class DeleteUserController implements Controller {
  constructor(private readonly deleteUser: DeleteUser) {}

  async handle(request: DeleteUserController.Request): Promise<any> {
    try {
      await this.deleteUser.perform({ id: request.userId });
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace DeleteUserController {
  export type Request = {
    userId: string;
  };
}
