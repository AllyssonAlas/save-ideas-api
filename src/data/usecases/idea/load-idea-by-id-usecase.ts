import { LoadIdeaById } from '@/domain/usecases';
import { LoadIdeaByIdRepository } from '@/data/protocols/repositories';

export class LoadIdeaByIdUsecase implements LoadIdeaById {
  constructor(private readonly loadIdeaByIdRepository: LoadIdeaByIdRepository) {}

  async perform(params: LoadIdeaById.Params): Promise<LoadIdeaById.Result> {
    return this.loadIdeaByIdRepository.load(params);
  }
}
