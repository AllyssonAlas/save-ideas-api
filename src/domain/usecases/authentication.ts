export namespace Authentication {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = {
    id: string;
    name: string;
    email: string;
    accessToken: string;
  };
}

export interface Authentication {
  perform: (params: Authentication.Params) => Promise<Authentication.Result>;
}
