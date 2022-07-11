import { User } from '@/domain/models';

export interface LoadUserRepository {
  load: (params: LoadUserRepository.Params) => Promise<LoadUserRepository.Result>;
}

export namespace LoadUserRepository {
  export type Params = {
    email: string;
  };

  export type Result = null | User;
}

export interface CreateUserRepository {
  create: (params: CreateUserRepository.Params) => Promise<CreateUserRepository.Result>;
}

export namespace CreateUserRepository {
  export type Params = {
    name: string;
    email: string;
    password: string;
  };

  export type Result = boolean;
}
