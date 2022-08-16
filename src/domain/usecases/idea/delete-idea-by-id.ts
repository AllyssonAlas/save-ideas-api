export namespace DeleteIdeaById {
  export type Params = { ideaId: string };

  export type Result = Promise<void>;
}

export interface DeleteIdeaById {
  perform: (params: DeleteIdeaById.Params) => Promise<DeleteIdeaById.Result>;
}
