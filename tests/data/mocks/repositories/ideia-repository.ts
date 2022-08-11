import {
  CreateIdeiaRepository,
  ListIdeiasRepository,
  LoadIdeiaByIdRepository,
} from '@/data/protocols/repositories';

export class CreateIdeiaRepositorySpy implements CreateIdeiaRepository {
  params?: CreateIdeiaRepository.Params;
  result = {
    id: 'any_id',
    ownerId: 'any_user_id',
    title: 'any_title_ideia',
    description: 'any_description_ideia',
    features: [
      {
        name: 'any_feature_name',
        description: 'any_feature_description',
        finished: false,
      },
    ],
  };

  callsCount = 0;

  async create(params: CreateIdeiaRepository.Params): Promise<CreateIdeiaRepository.Result> {
    this.callsCount++;
    this.params = params;
    return Promise.resolve(this.result);
  }
}

export class ListIdeiasRepositorySpy implements ListIdeiasRepository {
  params?: ListIdeiasRepository.Params;
  result = [
    {
      id: 'any_id',
      ownerId: 'any_user_id',
      title: 'any_title_ideia',
      description: 'any_description_ideia',
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
      title: 'other_title_ideia',
      description: 'other_description_ideia',
    },
  ];

  callsCount = 0;

  async list(params: ListIdeiasRepository.Params): Promise<ListIdeiasRepository.Result> {
    this.callsCount++;
    this.params = params;
    return Promise.resolve(this.result);
  }
}

export class LoadIdeiaByIdRepositorySpy implements LoadIdeiaByIdRepository {
  params?: LoadIdeiaByIdRepository.Params;
  result: LoadIdeiaByIdRepository.Result = {
    id: 'any_id',
    ownerId: 'any_user_id',
    title: 'any_title_ideia',
    description: 'any_description_ideia',
  };

  callsCount = 0;

  async load(params: LoadIdeiaByIdRepository.Params): Promise<LoadIdeiaByIdRepository.Result> {
    this.callsCount++;
    this.params = params;
    return Promise.resolve(this.result);
  }
}
