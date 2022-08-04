import { UpdateUserUsecase } from '@/data/usecases';

import {
  mockUpdateUserParams,
  mockUpdateUserWithDifferentValuesParams,
} from '@/tests/domain/mocks';
import {
  LoadUserByIdRepositorySpy,
  LoadUserByFielRepositorySpy,
  HasherComparerSpy,
  HasherSpy,
} from '@/tests/data/mocks';

interface SutTypes {
  sut: UpdateUserUsecase;
  loadUserByIdRepositorySpy: LoadUserByIdRepositorySpy;
  loadUserByFieldRepositorySpy: LoadUserByFielRepositorySpy;
  hasherComparerSpy: HasherComparerSpy;
  hasherSpy: HasherSpy;
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy();
  const hasherComparerSpy = new HasherComparerSpy();
  const loadUserByFieldRepositorySpy = new LoadUserByFielRepositorySpy();
  loadUserByFieldRepositorySpy.result = null;
  const loadUserByIdRepositorySpy = new LoadUserByIdRepositorySpy();
  const sut = new UpdateUserUsecase(
    loadUserByIdRepositorySpy,
    loadUserByFieldRepositorySpy,
    hasherComparerSpy,
    hasherSpy,
  );
  return {
    sut,
    loadUserByIdRepositorySpy,
    loadUserByFieldRepositorySpy,
    hasherComparerSpy,
    hasherSpy,
  };
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

  test('Should return success false if LoadUserByFieldRepository returns an user', async () => {
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

  test('Should throw if HasherComparer throws', async () => {
    const { sut, hasherComparerSpy } = makeSut();
    jest.spyOn(hasherComparerSpy, 'compare').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockUpdateUserWithDifferentValuesParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should return success false if HasherComparer returns isValid false', async () => {
    const { sut, hasherComparerSpy } = makeSut();
    hasherComparerSpy.result = { isValid: false };

    const updateUserResult = await sut.perform(mockUpdateUserWithDifferentValuesParams());

    expect(updateUserResult).toEqual({ success: false, invalidField: 'password' });
  });

  test('Should call Hasher with correct value', async () => {
    const { sut, hasherSpy } = makeSut();

    await sut.perform(mockUpdateUserWithDifferentValuesParams());

    expect(hasherSpy.params).toEqual({ plaintext: 'other_password' });
    expect(hasherSpy.callsCount).toBe(1);
  });
});
