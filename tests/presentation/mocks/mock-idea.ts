import { CreateIdea, ListIdeas, LoadIdeaById, DeleteIdeaById } from '@/domain/usecases';

export class CreateIdeaUsecaseSpy implements CreateIdea {
  params?: CreateIdea.Params;
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

  async perform(params: CreateIdea.Params): Promise<CreateIdea.Result> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.result);
  }
}

export class ListIdeasUsecaseSpy implements ListIdeas {
  params?: ListIdeas.Params;
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
  ];

  callsCount = 0;

  async perform(params: ListIdeas.Params): Promise<ListIdeas.Result> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.result);
  }
}

export class LoadIdeaByIdUsecaseSpy implements LoadIdeaById {
  params?: LoadIdeaById.Params;
  result: LoadIdeaById.Result = {
    id: 'any_idea_id',
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

  async perform(params: LoadIdeaById.Params): Promise<LoadIdeaById.Result> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.result);
  }
}

export class DeleteIdeaByIdUsecaseSpy implements DeleteIdeaById {
  params?: DeleteIdeaById.Params;
  callsCount = 0;

  async perform(params: DeleteIdeaById.Params): Promise<DeleteIdeaById.Result> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve();
  }
}
