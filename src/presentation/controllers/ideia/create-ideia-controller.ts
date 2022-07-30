import { CreateIdeia, LoadUserById } from '@/domain/usecases';
import { Controller, Validation } from '@/presentation/protocols';
import { badRequest, serverError } from '@/presentation/helpers';

export class CreateIdeiaController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadUserById: LoadUserById,
  ) {}

  async handle(request: CreateIdeiaController.Request): Promise<any> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      await this.loadUserById.perform({ id: request.userId });
      return Promise.resolve(null);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace CreateIdeiaController {
  export type Request = CreateIdeia.Params;
}
