import { User } from '@/domain/models';

export interface LoadUserByEmailRepository {
  load: (params: LoadUserByEmailRepository.Params) => Promise<LoadUserByEmailRepository.Result>;
}

export namespace LoadUserByEmailRepository {
  export type Params = {
    email: string;
  };

  export type Result = null | User;
}

export interface LoadUserByIdRepository {
  load: (params: LoadUserByIdRepository.Params) => Promise<LoadUserByIdRepository.Result>;
}

export namespace LoadUserByIdRepository {
  export type Params = {
    id: string;
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
  export type Params = {
    id: string;
    name: string;
    email: string;
    password: string;
    accessToken: string;
  };

  export type Result = void;
}
