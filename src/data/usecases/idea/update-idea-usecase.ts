import { UpdateIdea } from '@/domain/usecases';
import { UpdateIdeaRepository } from '@/data/protocols/repositories';

export class UpdateIdeaUsecase implements UpdateIdea {
  constructor(private readonly updateIdeaRepository: UpdateIdeaRepository) {}

  async perform(params: UpdateIdea.Params): Promise<UpdateIdea.Result> {
    await this.updateIdeaRepository.update(params);
  }
}
