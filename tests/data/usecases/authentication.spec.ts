import { AuthenticationUsecase } from '@/data/usecases';

import { LoadUserRepositorySpy, HasherComparerSpy } from '@/tests/data/mocks';

interface SutTypes {
  sut: AuthenticationUsecase;
  loadUserRepositorySpy: LoadUserRepositorySpy;
  hasherComparerSpy: HasherComparerSpy;
}

const makeSut = (): SutTypes => {
  const loadUserRepositorySpy = new LoadUserRepositorySpy();
  const hasherComparerSpy = new HasherComparerSpy();
  const sut = new AuthenticationUsecase(loadUserRepositorySpy, hasherComparerSpy);

  return { sut, loadUserRepositorySpy, hasherComparerSpy };
};

describe('AuthenticationUsecase', () => {
  test('Should call LoadUserRepository with correct value', async () => {
    const { sut, loadUserRepositorySpy } = makeSut();
    const authenticationParams = {
      email: 'any_email@email.com',
      password: 'any_password',
    };

    await sut.perform(authenticationParams);

    expect(loadUserRepositorySpy.params).toEqual({ email: 'any_email@email.com' });
    expect(loadUserRepositorySpy.callsCount).toBe(1);
  });

  test('Should throw if LoadUserRepository throws', async () => {
    const { sut, loadUserRepositorySpy } = makeSut();
    jest.spyOn(loadUserRepositorySpy, 'load').mockImplementationOnce(() => {
      throw new Error();
    });
    const authenticationParams = {
      email: 'any_email@email.com',
      password: 'any_password',
    };

    const promise = sut.perform(authenticationParams);

    await expect(promise).rejects.toThrow();
  });

  test('Should return null if LoadUserRepository returns null', async () => {
    const { sut, loadUserRepositorySpy } = makeSut();
    loadUserRepositorySpy.result = null;
    const authenticationParams = {
      email: 'any_email@email.com',
      password: 'any_password',
    };

    const authenticationResult = await sut.perform(authenticationParams);

    expect(authenticationResult).toBeNull();
  });

  test('Should call HasherComparer with correct values', async () => {
    const { sut, loadUserRepositorySpy, hasherComparerSpy } = makeSut();
    const authenticationParams = {
      email: 'any_email@email.com',
      password: 'any_password',
    };

    await sut.perform(authenticationParams);

    expect(hasherComparerSpy.params).toEqual({
      plaintext: 'any_password',
      digest: loadUserRepositorySpy.result?.password,
    });
    expect(hasherComparerSpy.callsCount).toBe(1);
  });

  test('Should throw if HasherComparer throws', async () => {
    const { sut, hasherComparerSpy } = makeSut();
    jest.spyOn(hasherComparerSpy, 'compare').mockImplementationOnce(() => {
      throw new Error();
    });
    const authenticationParams = {
      email: 'any_email@email.com',
      password: 'any_password',
    };

    const promise = sut.perform(authenticationParams);

    await expect(promise).rejects.toThrow();
  });

  test('Should return null if HasherComparer returns false', async () => {
    const { sut, hasherComparerSpy } = makeSut();
    hasherComparerSpy.result = false;
    const authenticationParams = {
      email: 'any_email@email.com',
      password: 'any_password',
    };

    const authenticationResult = await sut.perform(authenticationParams);

    expect(authenticationResult).toBeNull();
  });
});
