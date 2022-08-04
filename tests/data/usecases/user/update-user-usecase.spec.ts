import { UpdateUserUsecase } from '@/data/usecases';

import {
  mockUpdateUserParams,
  mockUpdateUserWithDifferentValuesParams,
} from '@/tests/domain/mocks';
import {
  LoadUserByIdRepositorySpy,
  LoadUserByFielRepositorySpy,
  HasherComparerSpy,
} from '@/tests/data/mocks';

interface SutTypes {
  sut: UpdateUserUsecase;
  loadUserByIdRepositorySpy: LoadUserByIdRepositorySpy;
  loadUserByFieldRepositorySpy: LoadUserByFielRepositorySpy;
  hasherComparerSpy: HasherComparerSpy;
}

const makeSut = (): SutTypes => {
  const hasherComparerSpy = new HasherComparerSpy();
  const loadUserByFieldRepositorySpy = new LoadUserByFielRepositorySpy();
  loadUserByFieldRepositorySpy.result = null;
  const loadUserByIdRepositorySpy = new LoadUserByIdRepositorySpy();
  const sut = new UpdateUserUsecase(
    loadUserByIdRepositorySpy,
    loadUserByFieldRepositorySpy,
    hasherComparerSpy,
  );
  return { sut, loadUserByIdRepositorySpy, loadUserByFieldRepositorySpy, hasherComparerSpy };
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

  test('Should throw if LoadUserByFieldRepository throws', async () => {
    const { sut, loadUserByFieldRepositorySpy } = makeSut();
    jest.spyOn(loadUserByFieldRepositorySpy, 'loadByField').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockUpdateUserWithDifferentValuesParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should return succes false if LoadUserByFieldRepository returns an user', async () => {
    const { sut, loadUserByFieldRepositorySpy } = makeSut();
    loadUserByFieldRepositorySpy.result = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      accessToken: 'any_access_token',
    };

    const updateUserResult = await sut.perform(mockUpdateUserWithDifferentValuesParams());

    expect(updateUserResult).toEqual({ success: false, invalidField: 'email' });
  });

  test('Should call HasherComparer with correct values if password is received', async () => {
    const { sut, loadUserByIdRepositorySpy, hasherComparerSpy } = makeSut();

    await sut.perform(mockUpdateUserWithDifferentValuesParams());

    expect(hasherComparerSpy.params).toEqual({
      plaintext: 'any_password',
      digest: loadUserByIdRepositorySpy.result?.password,
    });
    expect(hasherComparerSpy.callsCount).toBe(1);
  });
});
