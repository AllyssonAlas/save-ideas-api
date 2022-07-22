import { LoadUserByTokenUsecase } from '@/data/usecases';

import { DecrypterSpy } from '@/tests/data/mocks';

interface SutTypes {
  sut: LoadUserByTokenUsecase;
  decrypterSpy: DecrypterSpy;
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy();
  const sut = new LoadUserByTokenUsecase(decrypterSpy);
  return { sut, decrypterSpy };
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
    const { sut } = makeSut();

    const loadUserResult = await sut.perform({ accessToken: 'any_token' });

    expect(loadUserResult).toBeNull();
  });
});
