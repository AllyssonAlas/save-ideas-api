import { ListIdeias } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols';
import { serverError } from '@/presentation/helpers';

export class ListIdeiasController implements Controller {
  constructor(private readonly listIdeias: ListIdeias) {}

  async handle(request: ListIdeiasController.Request): Promise<any> {
    try {
      await this.listIdeias.perform(request);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace ListIdeiasController {
  export type Request = ListIdeias.Params;
}
