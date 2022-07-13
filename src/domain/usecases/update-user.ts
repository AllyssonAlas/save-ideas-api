export namespace UpdateUser {
  export type Params = {
    name: string;
    email: string;
    password: string;
  };
}

export interface UpdateUser {
  perform: (params: UpdateUser.Params) => Promise<void>;
}
