import { AuthenticationUsecase } from '@/data/usecases';

import { LoadUserRepositorySpy } from '@/tests/data/mocks';

interface SutTypes {
  sut: AuthenticationUsecase;
  loadUserRepositorySpy: LoadUserRepositorySpy;
}

const makeSut = (): SutTypes => {
  const loadUserRepositorySpy = new LoadUserRepositorySpy();
  const sut = new AuthenticationUsecase(loadUserRepositorySpy);

  return { sut, loadUserRepositorySpy };
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
});
