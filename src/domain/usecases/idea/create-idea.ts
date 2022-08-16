import { Idea } from '@/domain/models';

export namespace CreateIdea {
  export type Params = Omit<Idea & { userId: string }, 'id' | 'ownerId'>;

  export type Result = Idea;
}

export interface CreateIdea {
  perform: (params: CreateIdea.Params) => Promise<CreateIdea.Result>;
}
