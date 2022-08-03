import { Ideia } from '@/domain/models';

export namespace CreateIdeia {
  export type Params = Omit<Ideia & { userId: string }, 'id' | 'ownerId'>;

  export type Result = Ideia;
}

export interface CreateIdeia {
  perform: (params: CreateIdeia.Params) => Promise<CreateIdeia.Result>;
}
