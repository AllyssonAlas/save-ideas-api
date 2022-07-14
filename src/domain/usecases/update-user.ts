export namespace UpdateUser {
  export type Params = {
    name: string;
    email: string;
    newPassword?: string;
    password?: string;
    passwordHash: string;
  };

  export type Result = {
    wasSuccessful: boolean;
  };
}

export interface UpdateUser {
  perform: (params: UpdateUser.Params) => Promise<UpdateUser.Result>;
}
