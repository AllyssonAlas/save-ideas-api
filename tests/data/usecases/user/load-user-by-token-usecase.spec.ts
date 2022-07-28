import { LoadUserByTokenUsecase } from '@/data/usecases';

import { DecrypterSpy, LoadUserByEmailRepositorySpy } from '@/tests/data/mocks';
interface SutTypes {
  sut: LoadUserByTokenUsecase;
  decrypterSpy: DecrypterSpy;
  loadUserByEmailRepositorySpy: LoadUserByEmailRepositorySpy;
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
  const decrypterSpy = new DecrypterSpy();
  const sut = new LoadUserByTokenUsecase(decrypterSpy, loadUserByEmailRepositorySpy);
  return { sut, decrypterSpy, loadUserByEmailRepositorySpy };
};

describe('LoadUserByTokenUsecase', () => {
  test('Should call Decryter with correct value', async () => {
    const { sut, decrypterSpy } = makeSut();

    await sut.perform({ accessToken: 'any_token' });

    expect(decrypterSpy.params).toEqual({ ciphertext: 'any_token' });
    expect(decrypterSpy.callsCount).toBe(1);
  });

  test('Should throw if Decryter throws', async () => {
    const { sut, decrypterSpy } = makeSut();
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform({ accessToken: 'any_token' });

    await expect(promise).rejects.toThrow();
  });

  test('Should return null if Decryter returns false', async () => {
    const { sut, decrypterSpy } = makeSut();
    decrypterSpy.result = { isTokenValid: false };

    const loadUserResult = await sut.perform({ accessToken: 'any_token' });

    expect(loadUserResult).toBeNull();
  });

  test('Should call LoadUserByFieldRepository with correct value', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();

    await sut.perform({ accessToken: 'any_token' });

    expect(loadUserByEmailRepositorySpy.params).toEqual({ accessToken: 'any_token' });
    expect(loadUserByEmailRepositorySpy.callsCount).toBe(1);
  });

  test('Should throw if LoadUserByFieldRepository throws', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();
    jest.spyOn(loadUserByEmailRepositorySpy, 'loadByField').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform({ accessToken: 'any_token' });

    await expect(promise).rejects.toThrow();
  });

  test('Should return null if LoadUserByFieldRepository returns null', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();
    loadUserByEmailRepositorySpy.result = null;

    const loadUserResult = await sut.perform({ accessToken: 'any_token' });

    expect(loadUserResult).toBeNull();
  });

  test('Should return an user on success', async () => {
    const { sut } = makeSut();

    const loadUserResult = await sut.perform({ accessToken: 'any_token' });

    expect(loadUserResult).toEqual({ id: 'any_id' });
  });
});
