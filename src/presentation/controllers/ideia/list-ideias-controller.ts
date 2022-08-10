import { ListIdeias } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols';

export class ListIdeiasController implements Controller {
  constructor(private readonly listIdeias: ListIdeias) {}

  async handle(request: ListIdeiasController.Request): Promise<any> {
    await this.listIdeias.perform(request);
  }
}

export namespace ListIdeiasController {
  export type Request = ListIdeias.Params;
}
