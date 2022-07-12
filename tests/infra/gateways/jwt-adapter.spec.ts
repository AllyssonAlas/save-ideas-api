import jwt from 'jsonwebtoken';

import { JwtAdapter } from '@/infra/gateways';

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
  test('Should call sign with correct values', async () => {
    const { sut, secret } = makeSut();
    const signSpy = jest.spyOn(jwt, 'sign');

    await sut.encrypt({ plaintext: 'any_id' });

    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, secret);
  });
});
