import { LoadUserUsecase } from '@/data/usecases';

import { LoadUserByIdRepositorySpy } from '@/tests/data/mocks';

interface SutTypes {
  sut: LoadUserUsecase;
  loadUserByIdRepositorySpy: LoadUserByIdRepositorySpy;
}

const makeSut = (): SutTypes => {
  const loadUserByIdRepositorySpy = new LoadUserByIdRepositorySpy();
  const sut = new LoadUserUsecase(loadUserByIdRepositorySpy);
  return { sut, loadUserByIdRepositorySpy };
};

describe('LoadUserUsecase', () => {
  test('Should call LoadUserByIdRepository with correct value', async () => {
    const { sut, loadUserByIdRepositorySpy } = makeSut();

    await sut.perform({ id: 'any_id' });

    expect(loadUserByIdRepositorySpy.params).toEqual({ id: 'any_id' });
    expect(loadUserByIdRepositorySpy.callsCount).toBe(1);
  });

  test('Should throw if LoadUserByIdRepository throws', async () => {
    const { sut, loadUserByIdRepositorySpy } = makeSut();
    jest.spyOn(loadUserByIdRepositorySpy, 'load').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform({ id: 'any_id' });

    await expect(promise).rejects.toThrow();
  });

  test('Should return null if LoadUserByIdRepository returns null', async () => {
    const { sut, loadUserByIdRepositorySpy } = makeSut();
    loadUserByIdRepositorySpy.result = null;

    const loadUserResult = await sut.perform({ id: 'any_id' });

    expect(loadUserResult).toBeNull();
  });

  test('Should return an user on success', async () => {
    const { sut } = makeSut();

    const loadUserResult = await sut.perform({ id: 'any_id' });

    expect(loadUserResult).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      accessToken: 'any_access_token',
    });
  });
});
