import { DeleteIdeaById } from '@/domain/usecases';
import { DeleteIdeaByIdRepository } from '@/data/protocols/repositories';

export class DeleteIdeaByIdUsecase implements DeleteIdeaById {
  constructor(private readonly deleteIdeaByIdRepository: DeleteIdeaByIdRepository) {}

  async perform(params: DeleteIdeaById.Params): Promise<DeleteIdeaById.Result> {
    await this.deleteIdeaByIdRepository.deleteById(params);
  }
}
