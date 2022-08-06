import { UpdateUser } from '@/domain/usecases';
import {
  LoadUserByIdRepository,
  LoadUserByFieldRepository,
  UpdateUserRepository,
} from '@/data/protocols/repositories';
import { HasherComparer, Hasher } from '@/data/protocols/gateways';

export class UpdateUserUsecase implements UpdateUser {
  constructor(
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
    private readonly loadUserByFieldRepository: LoadUserByFieldRepository,
    private readonly hasherComparer: HasherComparer,
    private readonly hasher: Hasher,
    private readonly updateUserRepository: UpdateUserRepository,
  ) {}

  async perform(params: UpdateUser.Params): Promise<any> {
    const { userId, name, email, password, newPassword } = params;
    const authedUserData = await this.loadUserByIdRepository.loadById({ id: userId });
    const newUserData: UpdateUserRepository.Params = {
      id: userId,
      name,
      email,
    };

    if (authedUserData?.email !== email) {
      const userData = await this.loadUserByFieldRepository.loadByField({ email });
      if (userData) {
        return { success: false, invalidField: 'email' };
      }
    }
    if (password && newPassword) {
      const { isValid } = await this.hasherComparer.compare({
        plaintext: password,
        digest: authedUserData?.password || '',
      });
      if (!isValid) {
        return { success: false, invalidField: 'password' };
      }
      const { ciphertext } = await this.hasher.hash({ plaintext: newPassword });
      newUserData.password = ciphertext;
    }

    await this.updateUserRepository.update(newUserData);
  }
}
