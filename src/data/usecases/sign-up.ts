import { SignUp } from '@/domain/usecases';
import { Hasher } from '@/data/protocols';

export class SignUpUsecase {
  constructor(private readonly hasher: Hasher) {}

  async perform(params: SignUp.Params): Promise<void> {
    await this.hasher.hash({ plaintext: params.password });
  }
}
