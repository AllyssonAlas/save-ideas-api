import jwt from 'jsonwebtoken';

import { JwtAdapter } from '@/infra/gateways';

describe('JwtAdapter', () => {
  test('Should call sign with correct values', async () => {
    const sut = new JwtAdapter('secret');
    const signSpy = jest.spyOn(jwt, 'sign');

    await sut.encrypt({ plaintext: 'any_id' });

    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
  });
});
