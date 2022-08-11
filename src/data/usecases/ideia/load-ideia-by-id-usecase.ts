import { LoadIdeiaById } from '@/domain/usecases';
import { LoadIdeiaByIdRepository } from '@/data/protocols/repositories';

export class LoadIdeiaByIdUsecase implements LoadIdeiaById {
  constructor(private readonly loadIdeiaByIdRepository: LoadIdeiaByIdRepository) {}

  async perform(params: LoadIdeiaById.Params): Promise<any> {
    await this.loadIdeiaByIdRepository.load(params);
  }
}
