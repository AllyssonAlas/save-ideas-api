export namespace UpdateUser {
  export type Params = {
    userId: string;
    name: string;
    email: string;
    newPassword?: string;
    password?: string;
  };

  export type Result = {
    success: boolean;
    invalidField?: string;
  };
}

export interface UpdateUser {
  perform: (params: UpdateUser.Params) => Promise<UpdateUser.Result>;
}
