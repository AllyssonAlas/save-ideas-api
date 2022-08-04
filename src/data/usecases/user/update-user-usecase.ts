import { UpdateUser } from '@/domain/usecases';
import { LoadUserByIdRepository, LoadUserByFieldRepository } from '@/data/protocols/repositories';
import { HasherComparer } from '@/data/protocols/gateways';

export class UpdateUserUsecase implements UpdateUser {
  constructor(
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
    private readonly loadUserByFieldRepository: LoadUserByFieldRepository,
    private readonly hasherComparer: HasherComparer,
  ) {}

  async perform(params: UpdateUser.Params): Promise<any> {
    const { userId, email, password } = params;
    const authedUserData = await this.loadUserByIdRepository.loadById({ id: userId });
    if (authedUserData?.email !== email) {
      const userData = await this.loadUserByFieldRepository.loadByField({ email });
      if (userData) {
        return { success: false, invalidField: 'email' };
      }
    }
    if (password) {
      const { isValid } = await this.hasherComparer.compare({
        plaintext: password,
        digest: authedUserData?.password || '',
      });
      if (!isValid) {
        return { success: false, invalidField: 'password' };
      }
    }
  }
}
