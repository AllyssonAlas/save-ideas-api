import jwt from 'jsonwebtoken';

import { Decrypter, Encrypter } from '@/data/protocols/gateways';

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(params: Encrypter.Params): Promise<Encrypter.Result> {
    const ciphertext = await jwt.sign({ id: params.plaintext }, this.secret);
    return { ciphertext };
  }

  async decrypt(params: Decrypter.Params): Promise<Decrypter.Result> {
    let token: any;

    try {
      token = await jwt.verify(params.ciphertext, this.secret);
    } catch (error) {
      const jwtErrors = ['TokenExpiredError', 'JsonWebTokenError', 'NotBeforeError'];
      if (jwtErrors.includes(error.name)) {
        token = null;
      } else {
        throw error;
      }
    }

    return { isTokenValid: !!token };
  }
}
