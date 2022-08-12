export namespace DeleteIdeiaById {
  export type Params = { ideiaId: string };

  export type Result = Promise<void>;
}

export interface DeleteIdeiaById {
  perform: (params: DeleteIdeiaById.Params) => Promise<DeleteIdeiaById.Result>;
}
