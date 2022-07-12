import bcrypt from 'bcrypt';

import { BcryptAdapter } from '@/infra/gateways/bcrypt-adapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return Promise.resolve('hashed_string');
  },

  async compare(): Promise<boolean> {
    return Promise.resolve(true);
  },
}));

interface SutTypes {
  sut: BcryptAdapter;
  salt: number;
}

const makeSut = (): SutTypes => {
  const salt = 12;
  const sut = new BcryptAdapter(salt);
  return { sut, salt };
};

describe('Hasher', () => {
  describe('hash()', () => {
    test('Should call hash with correct params', async () => {
      const { sut, salt } = makeSut();
      const hashSpy = jest.spyOn(bcrypt, 'hash');

      await sut.hash({ plaintext: 'any_string' });

      expect(hashSpy).toHaveBeenCalledWith('any_string', salt);
    });

    test('Should throw if hash throws', async () => {
      const { sut } = makeSut();
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
        throw new Error();
      });

      const promise = sut.hash({ plaintext: 'any_string' });

      await expect(promise).rejects.toThrow();
    });

    test('Should return a hashed string on succes', async () => {
      const { sut } = makeSut();

      const result = await sut.hash({ plaintext: 'any_string' });

      expect(result).toEqual({ ciphertext: 'hashed_string' });
    });
  });

  describe('compare()', () => {
    test('Should call compare with correct params', async () => {
      const { sut } = makeSut();
      const hashComparerSpy = jest.spyOn(bcrypt, 'compare');

      await sut.compare({ plaintext: 'any_string', digest: 'hashed_string' });

      expect(hashComparerSpy).toHaveBeenCalledWith('any_string', 'hashed_string');
    });

    test('Should throw if compare throws', async () => {
      const { sut } = makeSut();
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
        throw new Error();
      });

      const promise = sut.compare({ plaintext: 'any_string', digest: 'hashed_string' });

      await expect(promise).rejects.toThrow();
    });

    test('Should return false on failure', async () => {
      const { sut } = makeSut();
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(async () => Promise.resolve(false));

      const result = await sut.compare({ plaintext: 'any_string', digest: 'hashed_string' });

      expect(result).toBe(false);
    });
  });
});
