import { SignUp } from '@/domain/usecases';
import { Hasher } from '@/data/protocols';
import { LoadUserRepository } from '@/data/protocols/repositories';

export class SignUpUsecase {
  constructor(
    private readonly hasher: Hasher,
    private readonly loadUserRepository: LoadUserRepository,
  ) {}

  async perform(params: SignUp.Params): Promise<void> {
    const { email, password } = params;

    await this.hasher.hash({ plaintext: password });
    await this.loadUserRepository.load({ email });
  }
}
