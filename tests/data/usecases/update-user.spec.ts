import { UpdateUserUsecase } from '@/data/usecases';

import { HasherComparerSpy } from '@/tests/data/mocks';

describe('UpdateUserUsecase', () => {
  test('Should call HasherComparer with correct value if oldPassword is received', async () => {
    const hasherComparerSpy = new HasherComparerSpy();
    const sut = new UpdateUserUsecase(hasherComparerSpy);
    const mockUpdaterUserParamsWithOldPassword = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'other_password',
      oldPassword: 'any_password',
      oldPasswordHash: 'any_hashed_password',
    };

    await sut.perform(mockUpdaterUserParamsWithOldPassword);

    expect(hasherComparerSpy.params).toEqual({
      plaintext: 'any_password',
      digest: 'any_hashed_password',
    });
    expect(hasherComparerSpy.callsCount).toBe(1);
  });
});
