export interface LogErrorRepository {
  logError: (params: LogErrorRepository.Params) => Promise<void>;
}

export namespace LogErrorRepository {
  export type Params = {
    stack: string;
  };
}
