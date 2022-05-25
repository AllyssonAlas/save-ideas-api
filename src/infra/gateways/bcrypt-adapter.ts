import bcrypt from 'bcrypt';

import { Hasher } from '@/data/protocols/gateways';

export class BcryptAdapter implements Hasher {
  constructor(private readonly salt: number) {}

  async hash(params: Hasher.Params): Promise<Hasher.Result> {
    const ciphertext = await bcrypt.hash(params.plaintext, this.salt);
    return { ciphertext };
  }
}
