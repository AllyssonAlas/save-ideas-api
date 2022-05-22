import { Hasher } from '@/data/protocols/gateways';
import { LoadUserRepository } from '@/data/protocols/repositories';
import { SignUpUsecase } from '@/data/usecases';

const mockUserData = () => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

class HasherSpy implements Hasher {
  plaintext?: string;
  callsCount = 0;

  hash(params: Hasher.Params): void {
    this.callsCount++;
    this.plaintext = params.plaintext;
  }
}

class LoadUserRepositorySpy implements LoadUserRepository {
  email?: string;
  callsCount = 0;

  async load(params: LoadUserRepository.Params): Promise<void> {
    this.callsCount++;
    this.email = params.email;
    return Promise.resolve();
  }
}

interface SutTypes {
  hasherSpy: HasherSpy;
  loadUserRepositorySpy: LoadUserRepositorySpy;
  sut: SignUpUsecase;
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy();
  const loadUserRepositorySpy = new LoadUserRepositorySpy();
  const sut = new SignUpUsecase(hasherSpy, loadUserRepositorySpy);

  return { sut, hasherSpy, loadUserRepositorySpy };
};

describe('SignUpUsecase', () => {
  it('Should call Hasher with correct value', async () => {
    const { sut, hasherSpy } = makeSut();
    const userData = mockUserData();
    await sut.perform(userData);
    expect(hasherSpy.plaintext).toBe(userData.password);
    expect(hasherSpy.callsCount).toBe(1);
  });

  it('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut();
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.perform(mockUserData());
    await expect(promise).rejects.toThrow();
  });

  it('Should call LoadUserRepository with correct value', async () => {
    const { sut, loadUserRepositorySpy } = makeSut();
    const userData = mockUserData();
    await sut.perform(userData);
    expect(loadUserRepositorySpy.email).toBe(userData.email);
    expect(loadUserRepositorySpy.callsCount).toBe(1);
  });

  it('Should throw if LoadUserRepository throws', async () => {
    const { sut, loadUserRepositorySpy } = makeSut();
    jest.spyOn(loadUserRepositorySpy, 'load').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.perform(mockUserData());
    await expect(promise).rejects.toThrow();
  });
});
