import { Encrypter, Hasher, HasherComparer } from '@/data/protocols/gateways';

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

export class HasherComparerSpy implements HasherComparer {
  params?: HasherComparer.Params;
  result = true;
  callsCount = 0;

  async compare(params: HasherComparer.Params): Promise<HasherComparer.Result> {
    this.callsCount++;
    this.params = params;
    return Promise.resolve(this.result);
  }
}

export class EncrypterSpy implements Encrypter {
  params?: Encrypter.Params;
  result = { ciphertext: 'encrypted_string' };
  callsCount = 0;

  async encrypt(params: Encrypter.Params): Promise<Encrypter.Result> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.result);
  }
}
