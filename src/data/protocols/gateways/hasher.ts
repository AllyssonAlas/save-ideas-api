export interface Hasher {
  hash(plaintext: Hasher.Params): void;
}

export namespace Hasher {
  export type Params = { plaintext: string };
}
