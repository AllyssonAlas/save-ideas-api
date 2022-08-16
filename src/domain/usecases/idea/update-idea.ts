import { Idea } from '@/domain/models';

export namespace UpdateIdea {
  export type Params = Omit<Idea, 'ownerId'>;

  export type Result = void;
}

export interface UpdateIdea {
  perform: (params: UpdateIdea.Params) => Promise<UpdateIdea.Result>;
}
