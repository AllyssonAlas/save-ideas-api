import { Ideia } from '@/domain/models';

export interface CreateIdeiaRepository {
  create: (params: CreateIdeiaRepository.Params) => Promise<CreateIdeiaRepository.Result>;
}

export namespace CreateIdeiaRepository {
  export type Params = Omit<Ideia, 'id'>;

  export type Result = Ideia;
}

export interface ListIdeiasRepository {
  list: (params: ListIdeiasRepository.Params) => Promise<ListIdeiasRepository.Result>;
}

export namespace ListIdeiasRepository {
  export type Params = { userId: string };

  export type Result = Ideia[];
}
