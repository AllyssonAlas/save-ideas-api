import { DeleteIdeiaById } from '@/domain/usecases';
import { DeleteIdeiaByIdRepository } from '@/data/protocols/repositories';

export class DeleteIdeiaByIdUsecase implements DeleteIdeiaById {
  constructor(private readonly deleteIdeiaByIdRepository: DeleteIdeiaByIdRepository) {}

  async perform(params: DeleteIdeiaById.Params): Promise<DeleteIdeiaById.Result> {
    await this.deleteIdeiaByIdRepository.deleteById(params);
  }
}
