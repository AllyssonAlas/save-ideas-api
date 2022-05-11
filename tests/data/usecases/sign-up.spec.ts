import { Hasher } from '@/data/protocols';
import { SignUpUsecase } from '@/data/usecases';

class HasherSpy implements Hasher {
  plaintext?: string;
  callsCount = 0;

  hash(params: Hasher.Params): void {
    this.callsCount++;
    this.plaintext = params.plaintext;
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
