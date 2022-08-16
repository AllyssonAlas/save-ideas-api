import { CreateIdea } from '@/domain/usecases';
import { CreateIdeaRepository } from '@/data/protocols/repositories';

export class CreateIdeaUsecase implements CreateIdea {
  constructor(private readonly createIdeaRepository: CreateIdeaRepository) {}

  async perform(params: CreateIdea.Params): Promise<CreateIdea.Result> {
    const { userId, ...ideaData } = params;
    return this.createIdeaRepository.create({ ...ideaData, ownerId: userId });
  }
}
