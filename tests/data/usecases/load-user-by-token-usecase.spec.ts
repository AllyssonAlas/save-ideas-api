import { LoadUserByTokenUsecase } from '@/data/usecases';

import { DecrypterSpy } from '@/tests/data/mocks';

describe('LoadUserByTokenUsecase', () => {
  test('Should call Decryter with correct value', async () => {
    const decrypterSpy = new DecrypterSpy();
    const sut = new LoadUserByTokenUsecase(decrypterSpy);

    await sut.perform({ accessToken: 'any_token' });

    expect(decrypterSpy.params).toEqual({ ciphertext: 'any_token' });
    expect(decrypterSpy.callsCount).toBe(1);
  });
});
