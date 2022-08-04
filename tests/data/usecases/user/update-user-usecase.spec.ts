import { UpdateUserUsecase } from '@/data/usecases';

import {
  mockUpdateUserParams,
  mockUpdateUserWithDifferentValuesParams,
} from '@/tests/domain/mocks';
import { LoadUserByIdRepositorySpy, LoadUserByFielRepositorySpy } from '@/tests/data/mocks';

interface SutTypes {
  sut: UpdateUserUsecase;
  loadUserByIdRepositorySpy: LoadUserByIdRepositorySpy;
  loadUserByFieldRepositorySpy: LoadUserByFielRepositorySpy;
}

const makeSut = (): SutTypes => {
  const loadUserByFieldRepositorySpy = new LoadUserByFielRepositorySpy();
  const loadUserByIdRepositorySpy = new LoadUserByIdRepositorySpy();
  const sut = new UpdateUserUsecase(loadUserByIdRepositorySpy, loadUserByFieldRepositorySpy);
  return { sut, loadUserByIdRepositorySpy, loadUserByFieldRepositorySpy };
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

  test('Should call LoadUserByFieldRepository with correct value if different email is received', async () => {
    const { sut, loadUserByFieldRepositorySpy } = makeSut();

    await sut.perform(mockUpdateUserWithDifferentValuesParams());

    expect(loadUserByFieldRepositorySpy.params).toEqual({ email: 'other_email@mail.com' });
    expect(loadUserByFieldRepositorySpy.callsCount).toBe(1);
  });
});
