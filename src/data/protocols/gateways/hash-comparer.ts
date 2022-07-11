export namespace HasherComparer {
  export type Params = {
    plaintext: string;
    digest: string;
  };

  export type Result = boolean;
}

export interface HasherComparer {
  compare(params: HasherComparer.Params): Promise<HasherComparer.Result>;
}
