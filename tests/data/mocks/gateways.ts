import { Hasher } from '@/data/protocols/gateways';

export class HasherSpy implements Hasher {
  params?: Hasher.Params;
  result = { ciphertext: 'hashed_password' };
  callsCount = 0;

  async hash(params: Hasher.Params): Promise<Hasher.Result> {
    this.callsCount++;
    this.params = params;
    return Promise.resolve(this.result);
  }
}
