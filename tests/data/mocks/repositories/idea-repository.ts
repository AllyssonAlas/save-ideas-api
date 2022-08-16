import {
  CreateIdeaRepository,
  ListIdeasRepository,
  LoadIdeaByIdRepository,
  DeleteIdeaByIdRepository,
  UpdateIdeaRepository,
} from '@/data/protocols/repositories';

export class CreateIdeaRepositorySpy implements CreateIdeaRepository {
  params?: CreateIdeaRepository.Params;
  result = {
    id: 'any_id',
    ownerId: 'any_user_id',
    title: 'any_title_idea',
    description: 'any_description_idea',
    features: [
      {
        name: 'any_feature_name',
        description: 'any_feature_description',
        finished: false,
      },
    ],
  };

  callsCount = 0;

  async create(params: CreateIdeaRepository.Params): Promise<CreateIdeaRepository.Result> {
    this.callsCount++;
    this.params = params;
    return Promise.resolve(this.result);
  }
}

export class ListIdeasRepositorySpy implements ListIdeasRepository {
  params?: ListIdeasRepository.Params;
  result = [
    {
      id: 'any_id',
      ownerId: 'any_user_id',
      title: 'any_title_idea',
      description: 'any_description_idea',
      features: [
        {
          name: 'any_feature_name',
          description: 'any_feature_description',
          finished: false,
        },
      ],
    },
    {
      id: 'other_id',
      ownerId: 'any_user_id',
      title: 'other_title_idea',
      description: 'other_description_idea',
    },
  ];

  callsCount = 0;

  async list(params: ListIdeasRepository.Params): Promise<ListIdeasRepository.Result> {
    this.callsCount++;
    this.params = params;
    return Promise.resolve(this.result);
  }
}

export class LoadIdeaByIdRepositorySpy implements LoadIdeaByIdRepository {
  params?: LoadIdeaByIdRepository.Params;
  result: LoadIdeaByIdRepository.Result = {
    id: 'any_id',
    ownerId: 'any_user_id',
    title: 'any_title_idea',
    description: 'any_description_idea',
  };

  callsCount = 0;

  async load(params: LoadIdeaByIdRepository.Params): Promise<LoadIdeaByIdRepository.Result> {
    this.callsCount++;
    this.params = params;
    return Promise.resolve(this.result);
  }
}

export class DeleteIdeaByIdRepositorySpy implements DeleteIdeaByIdRepository {
  params?: DeleteIdeaByIdRepository.Params;
  callsCount = 0;

  async deleteById(
    params: DeleteIdeaByIdRepository.Params,
  ): Promise<DeleteIdeaByIdRepository.Result> {
    this.callsCount++;
    this.params = params;
    return Promise.resolve();
  }
}

export class UpdateIdeaRepositorySpy implements UpdateIdeaRepository {
  params?: UpdateIdeaRepository.Params;
  callsCount = 0;

  async update(params: UpdateIdeaRepository.Params): Promise<UpdateIdeaRepository.Result> {
    this.callsCount++;
    this.params = params;
    return Promise.resolve();
  }
}
