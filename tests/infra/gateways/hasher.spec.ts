import bcrypt from 'bcrypt';

import { BcryptAdapter } from '@/infra/gateways/bcrypt-adapter';

describe('Hasher', () => {
  it('Should call hash with correct params', async () => {
    const salt = 12;
    const sut = new BcryptAdapter(salt);
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.hash({ plaintext: 'any_string' });
    expect(hashSpy).toHaveBeenCalledWith('any_string', salt);
  });
});
