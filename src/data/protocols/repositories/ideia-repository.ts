import { Ideia } from '@/domain/models';

export interface CreateIdeiaRepository {
  create: (params: CreateIdeiaRepository.Params) => Promise<CreateIdeiaRepository.Result>;
}

export namespace CreateIdeiaRepository {
  export type Params = Omit<Ideia, 'id'>;

  export type Result = Ideia;
}
