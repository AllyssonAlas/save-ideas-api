import { User } from '@/domain/models';

export interface LoadUserByEmailRepository {
  loadByEmail: (
    params: LoadUserByEmailRepository.Params,
  ) => Promise<LoadUserByEmailRepository.Result>;
}

export namespace LoadUserByEmailRepository {
  export type Params = {
    email: string;
  };

  export type Result = null | User;
}

export interface LoadUserByIdRepository {
  loadById: (params: LoadUserByIdRepository.Params) => Promise<LoadUserByIdRepository.Result>;
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
  export type Params = User;

  export type Result = void;
}
