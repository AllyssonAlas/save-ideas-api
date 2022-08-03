import { CreateIdeia } from '@/domain/usecases';
import { Controller, Validation, HttpResponse } from '@/presentation/protocols';
import { badRequest, ok, serverError } from '@/presentation/helpers';

export class CreateIdeiaController implements Controller {
  constructor(private readonly validation: Validation, private readonly createIdeia: CreateIdeia) {}

  async handle(request: CreateIdeiaController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      const ideiaData = await this.createIdeia.perform(request);
      return ok(ideiaData);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace CreateIdeiaController {
  export type Request = CreateIdeia.Params;
}
