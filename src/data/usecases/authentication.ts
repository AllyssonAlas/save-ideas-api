import { Authentication } from '@/domain/usecases';
import { LoadUserRepository, UpdateUserRepository } from '@/data/protocols/repositories';
import { Encrypter, HasherComparer } from '@/data/protocols/gateways';

export class AuthenticationUsecase implements Authentication {
  constructor(
    private readonly loadUserRepository: LoadUserRepository,
    private readonly hasherComparer: HasherComparer,
    private readonly encrypter: Encrypter,
    private readonly updateUserRepository: UpdateUserRepository,
  ) {}

  async perform(params: Authentication.Params): Promise<Authentication.Result> {
    const userData = await this.loadUserRepository.load({ email: params.email });
    if (userData) {
      const { isValid } = await this.hasherComparer.compare({
        plaintext: params.password,
        digest: userData.password,
      });
      if (isValid) {
        const { ciphertext } = await this.encrypter.encrypt({ plaintext: userData.id });
        await this.updateUserRepository.update({ ...userData, accessToken: ciphertext });
        return {
          accessToken: ciphertext,
          id: userData.id,
          name: userData.name,
          email: userData.email,
        };
      }
    }
    return null;
  }
}
