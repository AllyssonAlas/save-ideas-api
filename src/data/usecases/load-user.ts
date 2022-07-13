import { LoadUser } from '@/domain/usecases';
import { LoadUserByIdRepository } from '@/data/protocols/repositories';

export class LoadUserUsecase implements LoadUser {
  constructor(private readonly loadUserByIdRepository: LoadUserByIdRepository) {}

  async perform(params: LoadUser.Params): Promise<any> {
    const userData = await this.loadUserByIdRepository.loadById(params);
    if (!userData) {
      return null;
    }
    return userData;
  }
}
