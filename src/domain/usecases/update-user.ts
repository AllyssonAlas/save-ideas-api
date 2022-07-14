export namespace UpdateUser {
  export type Params = {
    name: string;
    email: string;
    password: string;
    oldPassword?: string;
    oldPasswordHash?: string;
  };

  export type Result = {
    wasSuccessful: boolean;
  };
}

export interface UpdateUser {
  perform: (params: UpdateUser.Params) => Promise<UpdateUser.Result>;
}
