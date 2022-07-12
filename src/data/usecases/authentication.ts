import { Authentication } from '@/domain/usecases';
import { LoadUserRepository, UpdateUserRepository } from '@/data/protocols/repositories';
import { Encrypter, HasherComparer } from '@/data/protocols/gateways';

export class AuthenticationUsecase {
  constructor(
    private readonly loadUserRepository: LoadUserRepository,
    private readonly hasherComparer: HasherComparer,
    private readonly encrypter: Encrypter,
    private readonly updateUserRepository: UpdateUserRepository,
  ) {}

  async perform(params: Authentication.Params): Promise<any> {
    const userData = await this.loadUserRepository.load({ email: params.email });
    if (userData) {
      const isPasswordValid = await this.hasherComparer.compare({
        plaintext: params.password,
        digest: userData.password,
      });
      if (isPasswordValid) {
        const { ciphertext } = await this.encrypter.encrypt({ plaintext: userData.id });
        await this.updateUserRepository.update({ ...userData, accessToken: ciphertext });
      }
    }
    return null;
  }
}
