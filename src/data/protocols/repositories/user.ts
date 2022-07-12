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

export interface UpdateUserRepository {
  update: (params: UpdateUserRepository.Params) => Promise<UpdateUserRepository.Result>;
}

export namespace UpdateUserRepository {
  type UserAuthenticated = {
    id: string;
    name: string;
    email: string;
    password: string;
    accessToken: string;
  };

  export type Params = UserAuthenticated;

  export type Result = UserAuthenticated;
}
