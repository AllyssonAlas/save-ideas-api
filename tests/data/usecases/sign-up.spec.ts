import { SignUpError } from '@/domain/errors';
import { Hasher } from '@/data/protocols/gateways';
import { CreateUserRepository, LoadUserRepository } from '@/data/protocols/repositories';
import { SignUpUsecase } from '@/data/usecases';

const mockUserData = () => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

class HasherSpy implements Hasher {
  plaintext?: string;
  result = { ciphertext: 'hashed_password' };
  callsCount = 0;

  async hash(params: Hasher.Params): Promise<Hasher.Result> {
    this.callsCount++;
    this.plaintext = params.plaintext;
    return Promise.resolve(this.result);
  }
}

class LoadUserRepositorySpy implements LoadUserRepository {
  email?: string;
  result = {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    accessToken: 'any_access_token',
  };

  callsCount = 0;

  async load(params: LoadUserRepository.Params): Promise<LoadUserRepository.Result> {
    this.callsCount++;
    this.email = params.email;
    return Promise.resolve(this.result);
  }
}

class CreateUserRepositorySpy implements CreateUserRepository {
  params?: CreateUserRepository.Params;
  callsCount = 0;

  async create(params: CreateUserRepository.Params): Promise<void> {
    this.callsCount++;
    this.params = params;
    return Promise.resolve();
  }
}

interface SutTypes {
  hasherSpy: HasherSpy;
  loadUserRepositorySpy: LoadUserRepositorySpy;
  createUserRepositorySpy: CreateUserRepositorySpy;
  sut: SignUpUsecase;
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy();
  const loadUserRepositorySpy = new LoadUserRepositorySpy();
  const createUserRepositorySpy = new CreateUserRepositorySpy();
  const sut = new SignUpUsecase(hasherSpy, loadUserRepositorySpy, createUserRepositorySpy);

  return { sut, hasherSpy, loadUserRepositorySpy, createUserRepositorySpy };
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

  it('Should return SignUpError when LoadUserRepository returns user data', async () => {
    const { sut } = makeSut();
    const signUpResult = await sut.perform(mockUserData());
    expect(signUpResult).toEqual(new SignUpError());
  });

  it('Should call CreateUserRepository with correct values if LoadUserRepository returns null', async () => {
    const { sut, loadUserRepositorySpy, createUserRepositorySpy } = makeSut();
    jest
      .spyOn(loadUserRepositorySpy, 'load')
      .mockImplementationOnce(async () => Promise.resolve(null));
    await sut.perform(mockUserData());
    expect(createUserRepositorySpy.params).toEqual({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password',
    });
  });
});
