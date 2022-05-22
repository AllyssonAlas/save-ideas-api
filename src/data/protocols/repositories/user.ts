export interface LoadUserRepository {
  load: (params: LoadUserRepository.Params) => Promise<LoadUserRepository.Result>;
}

export namespace LoadUserRepository {
  export type Params = {
    email: string;
  };

  export type Result = null | {
    id: string;
    name: string;
    email: string;
    accessToken?: string;
  };
}

export interface CreateUserRepository {
  create: (params: CreateUserRepository.Params) => Promise<void>;
}

export namespace CreateUserRepository {
  export type Params = {
    name: string;
    email: string;
    password: string;
  };
}
