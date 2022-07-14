import { UpdateUser } from '@/domain/usecases';
import { HasherComparer, Hasher } from '@/data/protocols/gateways';

export class UpdateUserUsecase implements UpdateUser {
  constructor(private readonly hasherComparer: HasherComparer, private readonly hasher: Hasher) {}

  async perform(params: UpdateUser.Params): Promise<any> {
    const { password, passwordHash, newPassword = '' } = params;
    if (password) {
      const { isValid } = await this.hasherComparer.compare({
        plaintext: password,
        digest: passwordHash,
      });
      if (!isValid) {
        return { wasSuccessful: false };
      }
      await this.hasher.hash({ plaintext: newPassword });
    }
  }
}
