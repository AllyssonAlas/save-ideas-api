export interface Hasher {
  hash(plaintext: Hasher.Params): Promise<Hasher.Result>;
}

export namespace Hasher {
  export type Params = { plaintext: string };

  export type Result = { ciphertext: string };
}
