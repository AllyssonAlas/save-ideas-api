export namespace DeleteUser {
  export type Params = {
    id: string;
  };

  export type Result = void;
}

export interface DeleteUser {
  perform: (params: DeleteUser.Params) => Promise<DeleteUser.Result>;
}
