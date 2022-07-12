import { Authentication } from '@/domain/usecases';
import { LoadUserRepository } from '@/data/protocols/repositories';
import { Encrypter, HasherComparer } from '@/data/protocols/gateways';

export class AuthenticationUsecase {
  constructor(
    private readonly loadUserRepository: LoadUserRepository,
    private readonly hasherComparer: HasherComparer,
    private readonly encrypter: Encrypter,
  ) {}

  async perform(params: Authentication.Params): Promise<any> {
    const userData = await this.loadUserRepository.load({ email: params.email });
    if (userData) {
      const isPasswordValid = await this.hasherComparer.compare({
        plaintext: params.password,
        digest: userData.password,
      });

      if (isPasswordValid) {
        await this.encrypter.encrypt({ plaintext: userData.id });
      }
    }

    return null;
  }
}
