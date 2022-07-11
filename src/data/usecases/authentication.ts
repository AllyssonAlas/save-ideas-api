import { Authentication } from '@/domain/usecases';
import { LoadUserRepository } from '@/data/protocols/repositories';
import { HasherComparer } from '@/data/protocols/gateways';

export class AuthenticationUsecase {
  constructor(
    private readonly loadUserRepository: LoadUserRepository,
    private readonly hasherComparer: HasherComparer,
  ) {}

  async perform(params: Authentication.Params): Promise<any> {
    const userData = await this.loadUserRepository.load({ email: params.email });
    if (!userData) {
      return null;
    }
    await this.hasherComparer.compare({ plaintext: params.password, digest: userData.password });
  }
}
