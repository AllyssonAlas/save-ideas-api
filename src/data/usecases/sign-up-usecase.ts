import { SignUp } from '@/domain/usecases';
import { Hasher } from '@/data/protocols/gateways';
import { CreateUserRepository, LoadUserByEmailRepository } from '@/data/protocols/repositories';

export class SignUpUsecase implements SignUp {
  constructor(
    private readonly hasher: Hasher,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly createUserRepository: CreateUserRepository,
  ) {}

  async perform(params: SignUp.Params): Promise<SignUp.Result> {
    const { email, password } = params;
    const { ciphertext } = await this.hasher.hash({ plaintext: password });
    const userData = await this.loadUserByEmailRepository.loadByEmail({ email });
    if (!userData) {
      await this.createUserRepository.create({
        ...params,
        password: ciphertext,
      });
      return { wasSigned: true };
    }
    return { wasSigned: false };
  }
}
