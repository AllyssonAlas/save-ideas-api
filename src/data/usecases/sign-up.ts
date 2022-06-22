import { SignUp } from '@/domain/usecases';
import { SignUpError } from '@/domain/errors';
import { Hasher } from '@/data/protocols/gateways';
import { CreateUserRepository, LoadUserRepository } from '@/data/protocols/repositories';

export class SignUpUsecase implements SignUp {
  constructor(
    private readonly hasher: Hasher,
    private readonly loadUserRepository: LoadUserRepository,
    private readonly createUserRepository: CreateUserRepository,
  ) {}

  async perform(params: SignUp.Params): Promise<SignUp.Result> {
    const { email, password } = params;
    const { ciphertext } = await this.hasher.hash({ plaintext: password });
    const accountData = await this.loadUserRepository.load({ email });
    if (!accountData) {
      const newAccountData = await this.createUserRepository.create({
        ...params,
        password: ciphertext,
      });
      return newAccountData;
    }
    return new SignUpError();
  }
}
