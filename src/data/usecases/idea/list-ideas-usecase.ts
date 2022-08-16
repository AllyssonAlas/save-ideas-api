import { ListIdeas } from '@/domain/usecases';
import { ListIdeasRepository } from '@/data/protocols/repositories';

export class ListIdeasUsecase implements ListIdeas {
  constructor(private readonly listIdeasRepository: ListIdeasRepository) {}

  async perform(params: ListIdeas.Params): Promise<ListIdeas.Result> {
    return this.listIdeasRepository.list(params);
  }
}
