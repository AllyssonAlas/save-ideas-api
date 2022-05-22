import { CreateUserRepository, LoadUserRepository } from '@/data/protocols/repositories';

export class LoadUserRepositorySpy implements LoadUserRepository {
  params?: LoadUserRepository.Params;
  result = {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    accessToken: 'any_access_token',
  };

  callsCount = 0;

  async load(params: LoadUserRepository.Params): Promise<LoadUserRepository.Result> {
    this.callsCount++;
    this.params = params;
    return Promise.resolve(this.result);
  }
}

export class CreateUserRepositorySpy implements CreateUserRepository {
  params?: CreateUserRepository.Params;
  callsCount = 0;

  async create(params: CreateUserRepository.Params): Promise<void> {
    this.callsCount++;
    this.params = params;
    return Promise.resolve();
  }
}
