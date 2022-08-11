import { ListIdeias } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols';
import { noContent, ok, serverError } from '@/presentation/helpers';

export class ListIdeiasController implements Controller {
  constructor(private readonly listIdeias: ListIdeias) {}

  async handle(request: ListIdeiasController.Request): Promise<any> {
    try {
      const listIdeiasData = await this.listIdeias.perform(request);
      return listIdeiasData.length ? ok(listIdeiasData) : noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace ListIdeiasController {
  export type Request = ListIdeias.Params;
}
