import { CreateIdeia } from '@/domain/usecases';
import { CreateIdeiaRepository } from '@/data/protocols/repositories';

export class CreateIdeiaUsecase implements CreateIdeia {
  constructor(private readonly createIdeiaRepository: CreateIdeiaRepository) {}

  async perform(params: CreateIdeia.Params): Promise<CreateIdeia.Result> {
    const { userId, ...ideiaData } = params;
    return this.createIdeiaRepository.create({ ...ideiaData, ownerId: userId });
  }
}
