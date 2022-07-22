import { LoadUserByToken } from '@/domain/usecases';
import { Decrypter } from '@/data/protocols/gateways';
import { LoadUserByFieldRepository } from '@/data/protocols/repositories';

export class LoadUserByTokenUsecase implements LoadUserByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadUserByFieldRepository: LoadUserByFieldRepository,
  ) {}

  async perform(params: LoadUserByToken.Params): Promise<LoadUserByToken.Result> {
    const { isTokenValid } = await this.decrypter.decrypt({ ciphertext: params.accessToken });
    if (isTokenValid) {
      await this.loadUserByFieldRepository.loadByField({ accessToken: params.accessToken });
    }
    return Promise.resolve(null);
  }
}
