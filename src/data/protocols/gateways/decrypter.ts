export namespace Decrypter {
  export type Params = {
    ciphertext: string;
  };

  export type Result = {
    isTokenValid: boolean;
  };
}

export interface Decrypter {
  decrypt: (params: Decrypter.Params) => Promise<Decrypter.Result>;
}
