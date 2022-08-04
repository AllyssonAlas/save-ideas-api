import { LoadUserByTokenUsecase } from '@/data/usecases';

import { mockLoadUserByTokenParams } from '@/tests/domain/mocks';
import { DecrypterSpy, LoadUserByFielRepositorySpy } from '@/tests/data/mocks';
interface SutTypes {
  sut: LoadUserByTokenUsecase;
  decrypterSpy: DecrypterSpy;
  loadUserByFielRepositorySpy: LoadUserByFielRepositorySpy;
}

const makeSut = (): SutTypes => {
  const loadUserByFielRepositorySpy = new LoadUserByFielRepositorySpy();
  const decrypterSpy = new DecrypterSpy();
  const sut = new LoadUserByTokenUsecase(decrypterSpy, loadUserByFielRepositorySpy);
  return { sut, decrypterSpy, loadUserByFielRepositorySpy };
};

describe('LoadUserByTokenUsecase', () => {
  test('Should call Decryter with correct value', async () => {
    const { sut, decrypterSpy } = makeSut();

    await sut.perform(mockLoadUserByTokenParams());

    expect(decrypterSpy.params).toEqual({ ciphertext: 'any_token' });
    expect(decrypterSpy.callsCount).toBe(1);
  });

  test('Should throw if Decryter throws', async () => {
    const { sut, decrypterSpy } = makeSut();
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockLoadUserByTokenParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should return null if Decryter returns false', async () => {
    const { sut, decrypterSpy } = makeSut();
    decrypterSpy.result = { isTokenValid: false };

    const loadUserResult = await sut.perform(mockLoadUserByTokenParams());

    expect(loadUserResult).toBeNull();
  });

  test('Should call LoadUserByFieldRepository with correct value', async () => {
    const { sut, loadUserByFielRepositorySpy } = makeSut();

    await sut.perform(mockLoadUserByTokenParams());

    expect(loadUserByFielRepositorySpy.params).toEqual({ accessToken: 'any_token' });
    expect(loadUserByFielRepositorySpy.callsCount).toBe(1);
  });

  test('Should throw if LoadUserByFieldRepository throws', async () => {
    const { sut, loadUserByFielRepositorySpy } = makeSut();
    jest.spyOn(loadUserByFielRepositorySpy, 'loadByField').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockLoadUserByTokenParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should return null if LoadUserByFieldRepository returns null', async () => {
    const { sut, loadUserByFielRepositorySpy } = makeSut();
    loadUserByFielRepositorySpy.result = null;

    const loadUserResult = await sut.perform(mockLoadUserByTokenParams());

    expect(loadUserResult).toBeNull();
  });

  test('Should return an user on success', async () => {
    const { sut } = makeSut();

    const loadUserResult = await sut.perform(mockLoadUserByTokenParams());

    expect(loadUserResult).toEqual({ id: 'any_id' });
  });
});
