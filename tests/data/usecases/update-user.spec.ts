import { UpdateUserUsecase } from '@/data/usecases';

import { mockUpdaterUserParamsWithOldPassword } from '@/tests/domain/mocks';
import { HasherComparerSpy } from '@/tests/data/mocks';

interface SutTypes {
  sut: UpdateUserUsecase;
  hasherComparerSpy: HasherComparerSpy;
}

const makeSut = (): SutTypes => {
  const hasherComparerSpy = new HasherComparerSpy();
  const sut = new UpdateUserUsecase(hasherComparerSpy);

  return { sut, hasherComparerSpy };
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
});
