import bcrypt from 'bcrypt';

import { Hasher } from '@/data/protocols/gateways';

export class BcryptAdapter {
  constructor(private readonly salt: number) {}

  async hash(params: Hasher.Params): Promise<void> {
    await bcrypt.hash(params.plaintext, this.salt);
  }
}
