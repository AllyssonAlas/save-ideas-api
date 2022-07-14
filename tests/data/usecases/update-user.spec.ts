import { UpdateUserUsecase } from '@/data/usecases';

import { mockUpdaterUserParams, mockUpdaterUserParamsWithNewPassword } from '@/tests/domain/mocks';
import { HasherComparerSpy, HasherSpy, UpdateUserRepositorySpy } from '@/tests/data/mocks';

interface SutTypes {
  sut: UpdateUserUsecase;
  hasherComparerSpy: HasherComparerSpy;
  hasherSpy: HasherSpy;
  updateUserRepositorySpy: UpdateUserRepositorySpy;
}

const makeSut = (): SutTypes => {
  const updateUserRepositorySpy = new UpdateUserRepositorySpy();
  const hasherSpy = new HasherSpy();
  const hasherComparerSpy = new HasherComparerSpy();
  const sut = new UpdateUserUsecase(hasherComparerSpy, hasherSpy, updateUserRepositorySpy);

  return { sut, hasherComparerSpy, hasherSpy, updateUserRepositorySpy };
};

describe('UpdateUserUsecase', () => {
  test('Should call HasherComparer with correct value if newPassword is received', async () => {
    const { sut, hasherComparerSpy } = makeSut();

    await sut.perform(mockUpdaterUserParamsWithNewPassword());

    expect(hasherComparerSpy.params).toEqual({
      plaintext: 'any_password',
      digest: 'any_hashed_password',
    });
    expect(hasherComparerSpy.callsCount).toBe(1);
  });

  test('Should throw if HasherComparer throws', async () => {
    const { sut, hasherComparerSpy } = makeSut();
    jest.spyOn(hasherComparerSpy, 'compare').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockUpdaterUserParamsWithNewPassword());

    await expect(promise).rejects.toThrow();
  });

  test('Should return wasSuccessful false if HasherComparer returns false', async () => {
    const { sut, hasherComparerSpy } = makeSut();
    hasherComparerSpy.result = { isValid: false };

    const updateUserResult = await sut.perform(mockUpdaterUserParamsWithNewPassword());

    expect(updateUserResult).toEqual({ wasSuccessful: false });
  });

  test('Should call Hasher with correct value if HasherComparer returns true', async () => {
    const { sut, hasherSpy } = makeSut();
    const userData = mockUpdaterUserParamsWithNewPassword();

    await sut.perform(userData);

    expect(hasherSpy.params).toEqual({ plaintext: 'other_password' });
    expect(hasherSpy.callsCount).toBe(1);
  });

  test('Should not call HasherComparer if newPassword is not received', async () => {
    const { sut, hasherComparerSpy } = makeSut();

    await sut.perform(mockUpdaterUserParams());

    expect(hasherComparerSpy.callsCount).toBe(0);
  });

  test('Should not call Hasher if newPassword is not received', async () => {
    const { sut, hasherSpy } = makeSut();

    await sut.perform(mockUpdaterUserParams());

    expect(hasherSpy.callsCount).toBe(0);
  });

  test('Should call UpdateUserRepository with correct values', async () => {
    const { sut, updateUserRepositorySpy, hasherSpy } = makeSut();
    const hashedPassword = hasherSpy.result;

    await sut.perform(mockUpdaterUserParamsWithNewPassword());

    expect(updateUserRepositorySpy.params).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: hashedPassword.ciphertext,
    });
    expect(updateUserRepositorySpy.callsCount).toBe(1);
  });

  test('Should call UpdateUserRepository with passwordHash if newPassword is not receive', async () => {
    const { sut, updateUserRepositorySpy } = makeSut();

    await sut.perform(mockUpdaterUserParams());

    expect(updateUserRepositorySpy.params).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_hashed_password',
    });
    expect(updateUserRepositorySpy.callsCount).toBe(1);
  });

  test('Should throw if UpdateUserRepository throws', async () => {
    const { sut, updateUserRepositorySpy } = makeSut();
    jest.spyOn(updateUserRepositorySpy, 'update').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockUpdaterUserParamsWithNewPassword());

    await expect(promise).rejects.toThrow();
  });
});
