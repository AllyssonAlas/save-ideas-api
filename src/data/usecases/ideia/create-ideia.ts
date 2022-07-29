import { CreateIdeia } from '@/domain/usecases';
import { CreateIdeiaRepository } from '@/data/protocols/repositories';

export class CreateIdeiaUsecase {
  constructor(private readonly createIdeiaRepository: CreateIdeiaRepository) {}

  async perform(params: CreateIdeia.Params): Promise<any> {
    await this.createIdeiaRepository.create(params);
  }
}
