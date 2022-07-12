import bcrypt from 'bcrypt';

import { Hasher, HasherComparer } from '@/data/protocols/gateways';

export class BcryptAdapter implements Hasher, HasherComparer {
  constructor(private readonly salt: number) {}

  async hash(params: Hasher.Params): Promise<Hasher.Result> {
    const ciphertext = await bcrypt.hash(params.plaintext, this.salt);
    return { ciphertext };
  }

  async compare(params: HasherComparer.Params): Promise<HasherComparer.Result> {
    const isValid = await bcrypt.compare(params.plaintext, params.digest);
    return { isValid };
  }
}
