import { User } from '@/domain/models';

export interface LoadUserByFieldRepository {
  loadByField: (
    params: LoadUserByFieldRepository.Params,
  ) => Promise<LoadUserByFieldRepository.Result>;
}

export namespace LoadUserByFieldRepository {
  export type Params = {
    email?: string;
    accessToken?: string;
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

  export type Result = User;
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
    password?: string;
    accessToken?: string;
  };

  export type Result = void;
}

export interface DeleteUserRepository {
  delete: (params: DeleteUserRepository.Params) => Promise<DeleteUserRepository.Result>;
}

export namespace DeleteUserRepository {
  export type Params = { id: string };

  export type Result = void;
}
