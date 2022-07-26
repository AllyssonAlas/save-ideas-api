import { Decrypter, Encrypter, Hasher, HasherComparer } from '@/data/protocols/gateways';

export class DecrypterSpy implements Decrypter {
  params?: Decrypter.Params;
  result = { isTokenValid: true };
  callsCount = 0;

  async decrypt(params: Decrypter.Params): Promise<Decrypter.Result> {
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
  result = { isValid: true };
  callsCount = 0;

  async compare(params: HasherComparer.Params): Promise<HasherComparer.Result> {
    this.callsCount++;
    this.params = params;
    return Promise.resolve(this.result);
  }
}
