import { UpdateUserUsecase } from '@/data/usecases';

import { mockUpdateUserParams } from '@/tests/domain/mocks';
import { LoadUserByIdRepositorySpy } from '@/tests/data/mocks';

interface SutTypes {
  sut: UpdateUserUsecase;
  loadUserByIdRepositorySpy: LoadUserByIdRepositorySpy;
}

const makeSut = (): SutTypes => {
  const loadUserByIdRepositorySpy = new LoadUserByIdRepositorySpy();
  const sut = new UpdateUserUsecase(loadUserByIdRepositorySpy);
  return { sut, loadUserByIdRepositorySpy };
};

describe('UpdateUserUsecase', () => {
  test('Should call LoadUserByIdRepository with correct value', async () => {
    const { sut, loadUserByIdRepositorySpy } = makeSut();

    await sut.perform(mockUpdateUserParams());

    expect(loadUserByIdRepositorySpy.params).toEqual({ id: 'any_id' });
    expect(loadUserByIdRepositorySpy.callsCount).toBe(1);
  });

  test('Should throw if LoadUserByIdRepository throws', async () => {
    const { sut, loadUserByIdRepositorySpy } = makeSut();
    jest.spyOn(loadUserByIdRepositorySpy, 'loadById').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockUpdateUserParams());

    await expect(promise).rejects.toThrow();
  });
});
