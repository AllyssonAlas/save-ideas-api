import { SignUp } from '@/domain/usecases';
import { SignUpError } from '@/domain/errors';
import { Hasher } from '@/data/protocols';
import { LoadUserRepository } from '@/data/protocols/repositories';

export class SignUpUsecase implements SignUp {
  constructor(
    private readonly hasher: Hasher,
    private readonly loadUserRepository: LoadUserRepository,
  ) {}

  async perform(params: SignUp.Params): Promise<SignUp.Result> {
    const { email, password } = params;
    await this.hasher.hash({ plaintext: password });
    await this.loadUserRepository.load({ email });

    return new SignUpError();
  }
}
