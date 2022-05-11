import { SignUp } from '@/domain/usecases';

interface Hasher {
  hash(plaintext: Hasher.Params): void;
}

namespace Hasher {
  export type Params = { plaintext: string };
}

class HasherSpy implements Hasher {
  plaintext?: string;
  callsCount = 0;

  hash(params: Hasher.Params): void {
    this.callsCount++;
    this.plaintext = params.plaintext;
  }
}

class SignUpUsecase {
  constructor(private readonly hasher: Hasher) {}

  async perform(params: SignUp.Params): Promise<void> {
    await this.hasher.hash({ plaintext: params.password });
  }
}

describe('SignUpUsecase', () => {
  it('Should call Hasher with correct value', async () => {
    const hasherSpy = new HasherSpy();
    const sut = new SignUpUsecase(hasherSpy);
    const userData = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    };

    await sut.perform(userData);
    expect(hasherSpy.plaintext).toBe(userData.password);
    expect(hasherSpy.callsCount).toBe(1);
  });
});
