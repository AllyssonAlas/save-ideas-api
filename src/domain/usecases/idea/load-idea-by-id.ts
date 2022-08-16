import { Idea } from '@/domain/models';

export namespace LoadIdeaById {
  export type Params = { ideaId: string };

  export type Result = Idea | null;
}

export interface LoadIdeaById {
  perform: (params: LoadIdeaById.Params) => Promise<LoadIdeaById.Result>;
}
