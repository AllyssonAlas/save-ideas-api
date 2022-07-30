import { CreateIdeia } from '@/domain/usecases';
import { Controller, Validation } from '@/presentation/protocols';
import { badRequest } from '@/presentation/helpers';

export class CreateIdeiaController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(request: CreateIdeiaController.Request): Promise<any> {
    const error = this.validation.validate(request);
    if (error) {
      return badRequest(error);
    }
    return Promise.resolve(null);
  }
}

export namespace CreateIdeiaController {
  export type Request = CreateIdeia.Params;
}
