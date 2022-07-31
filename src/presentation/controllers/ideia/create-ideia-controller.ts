import { LoadUserById, CreateIdeia } from '@/domain/usecases';
import { Controller, Validation, HttpResponse } from '@/presentation/protocols';
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers';
import { InvalidParamError } from '@/presentation/errors';

export class CreateIdeiaController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadUserById: LoadUserById,
    private readonly createIdeia: CreateIdeia,
  ) {}

  async handle(request: CreateIdeiaController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      const userData = await this.loadUserById.perform({ id: request.userId });
      if (!userData) {
        return forbidden(new InvalidParamError('id'));
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
