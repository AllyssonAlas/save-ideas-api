import { AuthenticationUsecase } from '@/data/usecases';

import { mockAuthenticationParams } from '@/tests/domain/mocks';
import {
  LoadUserByEmailRepositorySpy,
  HasherComparerSpy,
  EncrypterSpy,
  UpdateUserRepositorySpy,
} from '@/tests/data/mocks';

interface SutTypes {
  sut: AuthenticationUsecase;
  loadUserByEmailRepositorySpy: LoadUserByEmailRepositorySpy;
  hasherComparerSpy: HasherComparerSpy;
  encrypterSpy: EncrypterSpy;
  updateUserRepositorySpy: UpdateUserRepositorySpy;
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
  const hasherComparerSpy = new HasherComparerSpy();
  const encrypterSpy = new EncrypterSpy();
  encrypterSpy.result = { ciphertext: 'any_access_token' };
  const updateUserRepositorySpy = new UpdateUserRepositorySpy();
  const sut = new AuthenticationUsecase(
    loadUserByEmailRepositorySpy,
    hasherComparerSpy,
    encrypterSpy,
    updateUserRepositorySpy,
  );

  return {
    sut,
    loadUserByEmailRepositorySpy,
    hasherComparerSpy,
    encrypterSpy,
    updateUserRepositorySpy,
  };
};

describe('AuthenticationUsecase', () => {
  test('Should call LoadUserByEmailRepository with correct value', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();

    await sut.perform(mockAuthenticationParams());

    expect(loadUserByEmailRepositorySpy.params).toEqual({ email: 'any_email@email.com' });
    expect(loadUserByEmailRepositorySpy.callsCount).toBe(1);
  });

  test('Should throw if LoadUserByEmailRepository throws', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();
    jest.spyOn(loadUserByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockAuthenticationParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should return null if LoadUserByEmailRepository returns null', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();
    loadUserByEmailRepositorySpy.result = null;

    const authenticationResult = await sut.perform(mockAuthenticationParams());

    expect(authenticationResult).toBeNull();
  });

  test('Should call HasherComparer with correct values', async () => {
    const { sut, loadUserByEmailRepositorySpy, hasherComparerSpy } = makeSut();

    await sut.perform(mockAuthenticationParams());

    expect(hasherComparerSpy.params).toEqual({
      plaintext: 'any_password',
      digest: loadUserByEmailRepositorySpy.result?.password,
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
    hasherComparerSpy.result = { isValid: false };

    const authenticationResult = await sut.perform(mockAuthenticationParams());

    expect(authenticationResult).toBeNull();
  });

  test('Should call Encrypter with correct value', async () => {
    const { sut, loadUserByEmailRepositorySpy, encrypterSpy } = makeSut();

    await sut.perform(mockAuthenticationParams());

    expect(encrypterSpy.params).toEqual({ plaintext: loadUserByEmailRepositorySpy.result?.id });
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
    const { sut, updateUserRepositorySpy, loadUserByEmailRepositorySpy, encrypterSpy } = makeSut();

    await sut.perform(mockAuthenticationParams());

    expect(updateUserRepositorySpy.params).toEqual({
      ...loadUserByEmailRepositorySpy.result,
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
    const { sut } = makeSut();

    const authenticationResult = await sut.perform(mockAuthenticationParams());

    expect(authenticationResult).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
      accessToken: 'any_access_token',
    });
  });
});
