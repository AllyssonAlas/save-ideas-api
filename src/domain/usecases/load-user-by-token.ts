export namespace LoadUserByToken {
  export type Params = {
    accessToken: string;
  };

  export type Result = null | { id: string };
}

export interface LoadUserByToken {
  perform: (params: LoadUserByToken.Params) => Promise<LoadUserByToken.Result>;
}
