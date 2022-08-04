import { UpdateUser } from '@/domain/usecases';
import { LoadUserByIdRepository, LoadUserByFieldRepository } from '@/data/protocols/repositories';

export class UpdateUserUsecase implements UpdateUser {
  constructor(
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
    private readonly loadUserByFieldRepository: LoadUserByFieldRepository,
  ) {}

  async perform(params: UpdateUser.Params): Promise<any> {
    const { userId, email } = params;
    const authedUserData = await this.loadUserByIdRepository.loadById({ id: userId });
    if (authedUserData?.email !== email) {
      const userData = await this.loadUserByFieldRepository.loadByField({ email });
      if (userData) {
        return { success: false, invalidField: 'email' };
      }
    }
  }
}
