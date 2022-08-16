import { Idea } from '@/domain/models';

export namespace ListIdeas {
  export type Params = { userId: string };

  export type Result = Idea[];
}

export interface ListIdeas {
  perform: (params: ListIdeas.Params) => Promise<ListIdeas.Result>;
}
