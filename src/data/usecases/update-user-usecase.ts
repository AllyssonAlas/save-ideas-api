import { UpdateUser } from '@/domain/usecases';
import { HasherComparer, Hasher } from '@/data/protocols/gateways';
import { LoadUserByEmailRepository, UpdateUserRepository } from '@/data/protocols/repositories';

export class UpdateUserUsecase implements UpdateUser {
  constructor(
    private readonly hasherComparer: HasherComparer,
    private readonly hasher: Hasher,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly updateUserRepository: UpdateUserRepository,
  ) {}

  async perform(params: UpdateUser.Params): Promise<UpdateUser.Result> {
    const { id, name, email, password, passwordHash, newPassword = '' } = params;
    let newPasswordHashed;
    if (password) {
      const { isValid } = await this.hasherComparer.compare({
        plaintext: password,
        digest: passwordHash,
      });
      if (!isValid) {
        return { success: false, invalidField: 'password' };
      }
      newPasswordHashed = await this.hasher.hash({ plaintext: newPassword });
    }
    const userData = await this.loadUserByEmailRepository.loadByEmail({ email });
    if (userData?.id !== id) {
      return { success: false, invalidField: 'email' };
    }
    await this.updateUserRepository.update({
      id,
      name,
      email,
      password: newPasswordHashed?.ciphertext || passwordHash,
    });
    return { success: true };
  }
}
