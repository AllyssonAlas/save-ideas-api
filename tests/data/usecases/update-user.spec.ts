import { UpdateUserUsecase } from '@/data/usecases';

import { mockUpdaterUserParamsWithOldPassword } from '@/tests/domain/mocks';
import { HasherComparerSpy, HasherSpy } from '@/tests/data/mocks';

interface SutTypes {
  sut: UpdateUserUsecase;
  hasherComparerSpy: HasherComparerSpy;
  hasherSpy: HasherSpy;
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy();
  const hasherComparerSpy = new HasherComparerSpy();
  const sut = new UpdateUserUsecase(hasherComparerSpy, hasherSpy);

  return { sut, hasherComparerSpy, hasherSpy };
};

describe('UpdateUserUsecase', () => {
  test('Should call HasherComparer with correct value if oldPassword is received', async () => {
    const { sut, hasherComparerSpy } = makeSut();

    await sut.perform(mockUpdaterUserParamsWithOldPassword());

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

    const promise = sut.perform(mockUpdaterUserParamsWithOldPassword());

    await expect(promise).rejects.toThrow();
  });

  test('Should return wasSuccessful false if HasherComparer returns false', async () => {
    const { sut, hasherComparerSpy } = makeSut();
    hasherComparerSpy.result = { isValid: false };

    const updateUserResult = await sut.perform(mockUpdaterUserParamsWithOldPassword());

    expect(updateUserResult).toEqual({ wasSuccessful: false });
  });

  test('Should call Hasher with correct value if HasherComparer returns true', async () => {
    const { sut, hasherSpy } = makeSut();
    const userData = mockUpdaterUserParamsWithOldPassword();

    await sut.perform(userData);

    expect(hasherSpy.params).toEqual({ plaintext: 'other_password' });
    expect(hasherSpy.callsCount).toBe(1);
  });
});
