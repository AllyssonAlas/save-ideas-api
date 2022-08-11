import { Ideia } from '@/domain/models';

export namespace ListIdeias {
  export type Params = { userId: string };

  export type Result = Ideia[];
}

export interface ListIdeias {
  perform: (params: ListIdeias.Params) => Promise<ListIdeias.Result>;
}
