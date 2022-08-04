import { UpdateUser } from '@/domain/usecases';
import { LoadUserByIdRepository, LoadUserByFieldRepository } from '@/data/protocols/repositories';

export class UpdateUserUsecase implements UpdateUser {
  constructor(
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
    private readonly loadUserByFieldRepository: LoadUserByFieldRepository,
  ) {}

  async perform(params: UpdateUser.Params): Promise<any> {
    const { userId, email } = params;
    const userData = await this.loadUserByIdRepository.loadById({ id: userId });
    if (userData?.email !== email) {
      await this.loadUserByFieldRepository.loadByField({ email });
    }
  }
}
