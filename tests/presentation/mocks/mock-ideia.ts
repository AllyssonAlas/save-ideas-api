import { CreateIdeia, ListIdeias, LoadIdeiaById } from '@/domain/usecases';

export class CreateIdeiaUsecaseSpy implements CreateIdeia {
  params?: CreateIdeia.Params;
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

  async perform(params: CreateIdeia.Params): Promise<CreateIdeia.Result> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.result);
  }
}

export class ListIdeiasUsecaseSpy implements ListIdeias {
  params?: ListIdeias.Params;
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
  ];

  callsCount = 0;

  async perform(params: ListIdeias.Params): Promise<ListIdeias.Result> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.result);
  }
}

export class LoadIdeiaByIdUsecaseSpy implements LoadIdeiaById {
  params?: LoadIdeiaById.Params;
  result = {
    id: 'any_ideia_id',
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

  async perform(params: LoadIdeiaById.Params): Promise<LoadIdeiaById.Result> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.result);
  }
}
