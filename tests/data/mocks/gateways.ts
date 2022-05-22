import { Hasher } from '@/data/protocols/gateways';

export class HasherSpy implements Hasher {
  plaintext?: string;
  result = { ciphertext: 'hashed_password' };
  callsCount = 0;

  async hash(params: Hasher.Params): Promise<Hasher.Result> {
    this.callsCount++;
    this.plaintext = params.plaintext;
    return Promise.resolve(this.result);
  }
}
