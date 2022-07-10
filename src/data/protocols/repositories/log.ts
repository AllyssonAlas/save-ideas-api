export interface LogErrorRepository {
  log: (params: LogErrorRepository.Params) => Promise<void>;
}

export namespace LogErrorRepository {
  export type Params = {
    stack: string;
  };
}
