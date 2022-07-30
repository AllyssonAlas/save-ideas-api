import { CreateIdeia } from '@/domain/usecases';
import { CreateIdeiaRepository } from '@/data/protocols/repositories';

export class CreateIdeiaUsecase implements CreateIdeia {
  constructor(private readonly createIdeiaRepository: CreateIdeiaRepository) {}

  async perform(params: CreateIdeia.Params): Promise<CreateIdeia.Result> {
    return this.createIdeiaRepository.create(params);
  }
}
