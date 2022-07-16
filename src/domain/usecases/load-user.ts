import { User } from '@/domain/models';

export namespace LoadUser {
  export type Params = {
    id: string;
  };

  export type Result = null | User;
}

export interface LoadUser {
  perform: (params: LoadUser.Params) => Promise<LoadUser.Result>;
}