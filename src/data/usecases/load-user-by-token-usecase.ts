import { LoadUserByToken } from '@/domain/usecases';
import { Decrypter } from '@/data/protocols/gateways';

export class LoadUserByTokenUsecase implements LoadUserByToken {
  constructor(private readonly decrypter: Decrypter) {}

  async perform(params: LoadUserByToken.Params): Promise<LoadUserByToken.Result> {
    await this.decrypter.decrypt({ ciphertext: params.accessToken });
    return Promise.resolve(null);
  }
}
