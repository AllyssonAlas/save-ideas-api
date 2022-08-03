import { LoadUserByIdUsecase } from '@/data/usecases';

import { mockLoadUserByIdParams } from '@/tests/domain/mocks';
import { LoadUserByIdRepositorySpy } from '@/tests/data/mocks';

interface SutTypes {
  sut: LoadUserByIdUsecase;
  loadUserByIdRepositorySpy: LoadUserByIdRepositorySpy;
}

const makeSut = (): SutTypes => {
  const loadUserByIdRepositorySpy = new LoadUserByIdRepositorySpy();
  const sut = new LoadUserByIdUsecase(loadUserByIdRepositorySpy);
  return { sut, loadUserByIdRepositorySpy };
};

describe('LoadUserByIdUsecase', () => {
  test('Should call LoadUserByIdRepository with correct value', async () => {
    const { sut, loadUserByIdRepositorySpy } = makeSut();

    await sut.perform(mockLoadUserByIdParams());

    expect(loadUserByIdRepositorySpy.params).toEqual({ id: 'any_id' });
    expect(loadUserByIdRepositorySpy.callsCount).toBe(1);
  });

  test('Should throw if LoadUserByIdRepository throws', async () => {
    const { sut, loadUserByIdRepositorySpy } = makeSut();
    jest.spyOn(loadUserByIdRepositorySpy, 'loadById').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockLoadUserByIdParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should return null if LoadUserByIdRepository returns null', async () => {
    const { sut, loadUserByIdRepositorySpy } = makeSut();
    loadUserByIdRepositorySpy.result = null;

    const loadUserResult = await sut.perform(mockLoadUserByIdParams());

    expect(loadUserResult).toBeNull();
  });

  test('Should return an user on success', async () => {
    const { sut } = makeSut();

    const loadUserResult = await sut.perform(mockLoadUserByIdParams());

    expect(loadUserResult).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      accessToken: 'any_access_token',
    });
  });
});
