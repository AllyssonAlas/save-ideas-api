import { Ideia } from '@/domain/models';

export namespace LoadIdeiaById {
  export type Params = { ideiaId: string };

  export type Result = Ideia | null;
}

export interface LoadIdeiaById {
  perform: (params: LoadIdeiaById.Params) => Promise<LoadIdeiaById.Result>;
}
