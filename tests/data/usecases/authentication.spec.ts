import { AuthenticationUsecase } from '@/data/usecases';

import { mockAuthenticationParams } from '@/tests/domain/mocks';
import {
  LoadUserRepositorySpy,
  HasherComparerSpy,
  EncrypterSpy,
  UpdateUserRepositorySpy,
} from '@/tests/data/mocks';

interface SutTypes {
  sut: AuthenticationUsecase;
  loadUserRepositorySpy: LoadUserRepositorySpy;
  hasherComparerSpy: HasherComparerSpy;
  encrypterSpy: EncrypterSpy;
  updateUserRepositorySpy: UpdateUserRepositorySpy;
}

const makeSut = (): SutTypes => {
  const loadUserRepositorySpy = new LoadUserRepositorySpy();
  const hasherComparerSpy = new HasherComparerSpy();
  const encrypterSpy = new EncrypterSpy();
  encrypterSpy.result = { ciphertext: 'any_access_token' };
  const updateUserRepositorySpy = new UpdateUserRepositorySpy();
  const sut = new AuthenticationUsecase(
    loadUserRepositorySpy,
    hasherComparerSpy,
    encrypterSpy,
    updateUserRepositorySpy,
  );

  return { sut, loadUserRepositorySpy, hasherComparerSpy, encrypterSpy, updateUserRepositorySpy };
};

describe('AuthenticationUsecase', () => {
  test('Should call LoadUserRepository with correct value', async () => {
    const { sut, loadUserRepositorySpy } = makeSut();

    await sut.perform(mockAuthenticationParams());

    expect(loadUserRepositorySpy.params).toEqual({ email: 'any_email@email.com' });
    expect(loadUserRepositorySpy.callsCount).toBe(1);
  });

  test('Should throw if LoadUserRepository throws', async () => {
    const { sut, loadUserRepositorySpy } = makeSut();
    jest.spyOn(loadUserRepositorySpy, 'load').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockAuthenticationParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should return null if LoadUserRepository returns null', async () => {
    const { sut, loadUserRepositorySpy } = makeSut();
    loadUserRepositorySpy.result = null;

    const authenticationResult = await sut.perform(mockAuthenticationParams());

    expect(authenticationResult).toBeNull();
  });

  test('Should call HasherComparer with correct values', async () => {
    const { sut, loadUserRepositorySpy, hasherComparerSpy } = makeSut();

    await sut.perform(mockAuthenticationParams());

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

    const promise = sut.perform(mockAuthenticationParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should return null if HasherComparer returns false', async () => {
    const { sut, hasherComparerSpy } = makeSut();
    hasherComparerSpy.result = false;

    const authenticationResult = await sut.perform(mockAuthenticationParams());

    expect(authenticationResult).toBeNull();
  });

  test('Should call Encrypter with correct value', async () => {
    const { sut, loadUserRepositorySpy, encrypterSpy } = makeSut();

    await sut.perform(mockAuthenticationParams());

    expect(encrypterSpy.params).toEqual({ plaintext: loadUserRepositorySpy.result?.id });
    expect(encrypterSpy.callsCount).toBe(1);
  });

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut();
    jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockAuthenticationParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should call UpdateUserRepository with correct values', async () => {
    const { sut, updateUserRepositorySpy, loadUserRepositorySpy, encrypterSpy } = makeSut();

    await sut.perform(mockAuthenticationParams());

    expect(updateUserRepositorySpy.params).toEqual({
      ...loadUserRepositorySpy.result,
      accessToken: encrypterSpy.result.ciphertext,
    });
    expect(updateUserRepositorySpy.callsCount).toBe(1);
  });

  test('Should throw if UpdateUserRepository throws', async () => {
    const { sut, updateUserRepositorySpy } = makeSut();
    jest.spyOn(updateUserRepositorySpy, 'update').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockAuthenticationParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should return user data on success', async () => {
    const { sut, updateUserRepositorySpy } = makeSut();

    const authenticationResult = await sut.perform(mockAuthenticationParams());

    expect(authenticationResult).toEqual(updateUserRepositorySpy.result);
  });
});
