import { DeleteUser } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols';

export class DeleteUserController implements Controller {
  constructor(private readonly deleteUser: DeleteUser) {}

  async handle(request: DeleteUserController.Request): Promise<any> {
    await this.deleteUser.perform({ id: request.userId });
  }
}

export namespace DeleteUserController {
  export type Request = {
    userId: string;
  };
}
