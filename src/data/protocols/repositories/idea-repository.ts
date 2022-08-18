import { Idea } from '@/domain/models';

export interface CreateIdeaRepository {
  create: (params: CreateIdeaRepository.Params) => Promise<CreateIdeaRepository.Result>;
}

export namespace CreateIdeaRepository {
  export type Params = Omit<Idea, 'id'>;

  export type Result = Idea;
}

export interface ListIdeasRepository {
  list: (params: ListIdeasRepository.Params) => Promise<ListIdeasRepository.Result>;
}

export namespace ListIdeasRepository {
  export type Params = { userId: string };

  export type Result = Idea[];
}

export interface LoadIdeaByIdRepository {
  load: (params: LoadIdeaByIdRepository.Params) => Promise<LoadIdeaByIdRepository.Result>;
}

export namespace LoadIdeaByIdRepository {
  export type Params = { ideaId: string };

  export type Result = Idea | null;
}

export interface DeleteIdeaByIdRepository {
  deleteById: (params: DeleteIdeaByIdRepository.Params) => Promise<DeleteIdeaByIdRepository.Result>;
}

export namespace DeleteIdeaByIdRepository {
  export type Params = { ideaId: string };

  export type Result = void;
}

export interface UpdateIdeaRepository {
  update: (params: UpdateIdeaRepository.Params) => Promise<UpdateIdeaRepository.Result>;
}

export namespace UpdateIdeaRepository {
  export type Params = Omit<Idea, 'ownerId'>;

  export type Result = void;
}
