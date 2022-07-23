import jwt from 'jsonwebtoken';

import { Decrypter, Encrypter } from '@/data/protocols/gateways';

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(params: Encrypter.Params): Promise<Encrypter.Result> {
    const ciphertext = await jwt.sign({ id: params.plaintext }, this.secret);
    return { ciphertext };
  }

  async decrypt(params: Decrypter.Params): Promise<any> {
    await jwt.verify(params.ciphertext, this.secret);
  }
}
