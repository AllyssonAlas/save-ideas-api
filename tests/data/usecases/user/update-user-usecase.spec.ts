import { UpdateUserUsecase } from '@/data/usecases';

import {
  mockUpdateUserParams,
  mockUpdateUserWithAdditionalValuesParams,
} from '@/tests/domain/mocks';
import {
  LoadUserByIdRepositorySpy,
  LoadUserByFielRepositorySpy,
  HasherComparerSpy,
  HasherSpy,
  UpdateUserRepositorySpy,
} from '@/tests/data/mocks';

interface SutTypes {
  sut: UpdateUserUsecase;
  loadUserByIdRepositorySpy: LoadUserByIdRepositorySpy;
  loadUserByFieldRepositorySpy: LoadUserByFielRepositorySpy;
  hasherComparerSpy: HasherComparerSpy;
  hasherSpy: HasherSpy;
  updateUserRepositorySpy: UpdateUserRepositorySpy;
}

const makeSut = (): SutTypes => {
  const updateUserRepositorySpy = new UpdateUserRepositorySpy();
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
    updateUserRepositorySpy,
  );
  return {
    sut,
    loadUserByIdRepositorySpy,
    loadUserByFieldRepositorySpy,
    hasherComparerSpy,
    hasherSpy,
    updateUserRepositorySpy,
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

    await sut.perform(mockUpdateUserWithAdditionalValuesParams());

    expect(loadUserByFieldRepositorySpy.params).toEqual({ email: 'other_email@mail.com' });
    expect(loadUserByFieldRepositorySpy.callsCount).toBe(1);
  });

  test('Should throw if LoadUserByFieldRepository throws', async () => {
    const { sut, loadUserByFieldRepositorySpy } = makeSut();
    jest.spyOn(loadUserByFieldRepositorySpy, 'loadByField').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockUpdateUserWithAdditionalValuesParams());

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

    const updateUserResult = await sut.perform(mockUpdateUserWithAdditionalValuesParams());

    expect(updateUserResult).toEqual({ success: false, invalidField: 'email' });
  });

  test('Should call HasherComparer with correct values if password is received', async () => {
    const { sut, loadUserByIdRepositorySpy, hasherComparerSpy } = makeSut();

    await sut.perform(mockUpdateUserWithAdditionalValuesParams());

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

    const promise = sut.perform(mockUpdateUserWithAdditionalValuesParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should return success false if HasherComparer returns isValid false', async () => {
    const { sut, hasherComparerSpy } = makeSut();
    hasherComparerSpy.result = { isValid: false };

    const updateUserResult = await sut.perform(mockUpdateUserWithAdditionalValuesParams());

    expect(updateUserResult).toEqual({ success: false, invalidField: 'password' });
  });

  test('Should call Hasher with correct value', async () => {
    const { sut, hasherSpy } = makeSut();

    await sut.perform(mockUpdateUserWithAdditionalValuesParams());

    expect(hasherSpy.params).toEqual({ plaintext: 'other_password' });
    expect(hasherSpy.callsCount).toBe(1);
  });

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut();
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockUpdateUserWithAdditionalValuesParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should call UpdateUserRepository with correct values', async () => {
    const { sut, updateUserRepositorySpy } = makeSut();

    await sut.perform(mockUpdateUserParams());

    expect(updateUserRepositorySpy.params).toEqual({
      id: 'any_id',
      name: 'other_name',
      email: 'any_email@mail.com',
    });
    expect(updateUserRepositorySpy.callsCount).toBe(1);
  });

  test('Should call UpdateUserRepository with addtional correct values', async () => {
    const { sut, updateUserRepositorySpy } = makeSut();

    await sut.perform(mockUpdateUserWithAdditionalValuesParams());

    expect(updateUserRepositorySpy.params).toEqual({
      id: 'any_id',
      name: 'other_name',
      email: 'other_email@mail.com',
      password: 'hashed_password',
    });
    expect(updateUserRepositorySpy.callsCount).toBe(1);
  });

  test('Should throw if UpdateUserRepository throws', async () => {
    const { sut, updateUserRepositorySpy } = makeSut();
    jest.spyOn(updateUserRepositorySpy, 'update').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockUpdateUserParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should return success true on success', async () => {
    const { sut } = makeSut();

    const updateUserResult = await sut.perform(mockUpdateUserParams());

    expect(updateUserResult).toEqual({ success: true });
  });
});
