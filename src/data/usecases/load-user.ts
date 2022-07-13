import { LoadUser } from '@/domain/usecases';
import { LoadUserByIdRepository } from '@/data/protocols/repositories';

export class LoadUserUsecase implements LoadUser {
  constructor(private readonly loadUserByIdRepository: LoadUserByIdRepository) {}

  async perform(params: LoadUser.Params): Promise<any> {
    const isIdValid = await this.loadUserByIdRepository.load(params);
    if (!isIdValid) {
      return null;
    }
  }
}
