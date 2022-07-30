import { CreateIdeia } from '@/domain/usecases';
import { Controller, Validation } from '@/presentation/protocols';

export class CreateIdeiaController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(request: CreateIdeiaController.Request): Promise<any> {
    this.validation.validate(request);
    return Promise.resolve(null);
  }
}

export namespace CreateIdeiaController {
  export type Request = CreateIdeia.Params;
}
