export interface LoadUserRepository {
  load: (params: LoadUserRepository.Params) => Promise<void>;
}

export namespace LoadUserRepository {
  export type Params = {
    email: string;
  };
}
