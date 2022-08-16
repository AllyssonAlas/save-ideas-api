import { ListIdeas } from '@/domain/usecases';
import { Controller } from '@/presentation/protocols';
import { noContent, ok, serverError } from '@/presentation/helpers';

export class ListIdeasController implements Controller {
  constructor(private readonly listIdeas: ListIdeas) {}

  async handle(request: ListIdeasController.Request): Promise<any> {
    try {
      const listIdeasData = await this.listIdeas.perform(request);
      return listIdeasData.length ? ok(listIdeasData) : noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace ListIdeasController {
  export type Request = ListIdeas.Params;
}
