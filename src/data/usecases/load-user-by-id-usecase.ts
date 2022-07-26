import { LoadUserById } from '@/domain/usecases';
import { LoadUserByIdRepository } from '@/data/protocols/repositories';

export class LoadUserByIdUsecase implements LoadUserById {
  constructor(private readonly loadUserByIdRepository: LoadUserByIdRepository) {}

  async perform(params: LoadUserById.Params): Promise<LoadUserById.Result> {
    const userData = await this.loadUserByIdRepository.loadById(params);
    if (!userData) {
      return null;
    }
    return userData;
  }
}
