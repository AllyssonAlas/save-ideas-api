import { CreateIdeiaRepository } from '@/data/protocols/repositories';

export class CreateIdeiaRepositorySpy implements CreateIdeiaRepository {
  params?: CreateIdeiaRepository.Params;
  result = {
    id: 'any_id',
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
