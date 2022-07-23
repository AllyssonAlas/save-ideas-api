import jwt from 'jsonwebtoken';

import { JwtAdapter } from '@/infra/gateways';

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return Promise.resolve('any_token');
  },

  async verify(): Promise<boolean> {
    return Promise.resolve(true);
  },
}));

interface SutTypes {
  sut: JwtAdapter;
  secret: string;
}

const makeSut = (): SutTypes => {
  const secret = 'secret';
  const sut = new JwtAdapter('secret');
  return { sut, secret };
};

describe('JwtAdapter', () => {
  describe('sign()', () => {
    test('Should call sign with correct values', async () => {
      const { sut, secret } = makeSut();
      const signSpy = jest.spyOn(jwt, 'sign');

      await sut.encrypt({ plaintext: 'any_id' });

      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, secret);
    });

    test('Should throw if sign throws', async () => {
      const { sut } = makeSut();
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error();
      });

      const promise = sut.encrypt({ plaintext: 'any_id' });

      await expect(promise).rejects.toThrow();
    });

    test('Should return a token on success', async () => {
      const { sut } = makeSut();

      const result = await sut.encrypt({ plaintext: 'any_id' });

      expect(result).toEqual({ ciphertext: 'any_token' });
    });
  });

  describe('verify()', () => {
    test('Should call verify with correct values', async () => {
      const { sut } = makeSut();
      const verifySpy = jest.spyOn(jwt, 'verify');

      await sut.decrypt({ ciphertext: 'any_token' });

      expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret');
    });
  });
});
