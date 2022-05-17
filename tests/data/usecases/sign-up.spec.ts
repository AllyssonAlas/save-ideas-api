import { Hasher } from '@/data/protocols/gateways';
import { SignUpUsecase } from '@/data/usecases';

class HasherSpy implements Hasher {
  plaintext?: string;
  callsCount = 0;

  hash(params: Hasher.Params): void {
    this.callsCount++;
    this.plaintext = params.plaintext;
  }
}

interface SutTypes {
  hasherSpy: HasherSpy;
  sut: SignUpUsecase;
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy();
  const sut = new SignUpUsecase(hasherSpy);

  return { sut, hasherSpy };
};

describe('SignUpUsecase', () => {
  it('Should call Hasher with correct value', async () => {
    const { sut, hasherSpy } = makeSut();
    const userData = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    };

    await sut.perform(userData);
    expect(hasherSpy.plaintext).toBe(userData.password);
    expect(hasherSpy.callsCount).toBe(1);
  });

  it('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut();

    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(() => {
      throw new Error();
    });
    const userData = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    };

    const promise = sut.perform(userData);
    await expect(promise).rejects.toThrow();
  });
});
