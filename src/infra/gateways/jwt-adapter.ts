import jwt from 'jsonwebtoken';

import { Encrypter } from '@/data/protocols/gateways';

export class JwtAdapter {
  constructor(private readonly secret: string) {}

  async encrypt(params: Encrypter.Params): Promise<void> {
    await jwt.sign({ id: params.plaintext }, this.secret);
  }
}
