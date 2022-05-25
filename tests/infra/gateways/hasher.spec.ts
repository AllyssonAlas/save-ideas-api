import bcrypt from 'bcrypt';

import { BcryptAdapter } from '@/infra/gateways/bcrypt-adapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return Promise.resolve('hashed_string');
  },
}));

describe('Hasher', () => {
  it('Should call hash with correct params', async () => {
    const salt = 12;
    const sut = new BcryptAdapter(salt);
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.hash({ plaintext: 'any_string' });
    expect(hashSpy).toHaveBeenCalledWith('any_string', salt);
  });

  it('Should return a result on succes', async () => {
    const salt = 12;
    const sut = new BcryptAdapter(salt);
    const result = await sut.hash({ plaintext: 'any_string' });
    expect(result).toEqual({ ciphertext: 'hashed_string' });
  });
});
