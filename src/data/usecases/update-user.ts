import { UpdateUser } from '@/domain/usecases';
import { HasherComparer } from '@/data/protocols/gateways';

export class UpdateUserUsecase implements UpdateUser {
  constructor(private readonly hasherComparer: HasherComparer) {}

  async perform(params: UpdateUser.Params): Promise<any> {
    if (params.password) {
      await this.hasherComparer.compare({
        plaintext: params.password,
        digest: params.passwordHash,
      });
      return { wasSuccessful: false };
    }
  }
}
