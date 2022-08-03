import { User } from '@/domain/models';

export namespace LoadUserById {
  export type Params = {
    id: string;
  };

  export type Result = null | User;
}

export interface LoadUserById {
  perform: (params: LoadUserById.Params) => Promise<LoadUserById.Result>;
}
