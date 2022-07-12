import {
  CreateUserRepository,
  LoadUserRepository,
  LogErrorRepository,
  UpdateUserRepository,
} from '@/data/protocols/repositories';

export class LoadUserRepositorySpy implements LoadUserRepository {
  params?: LoadUserRepository.Params;
  result: LoadUserRepository.Result = {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
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
  result = true;
  callsCount = 0;

  async create(params: CreateUserRepository.Params): Promise<CreateUserRepository.Result> {
    this.callsCount++;
    this.params = params;
    return Promise.resolve(!!this.result);
  }
}

export class UpdateUserRepositorySpy implements UpdateUserRepository {
  params?: UpdateUserRepository.Params;
  result = {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    accessToken: 'any_access_token',
  };

  callsCount = 0;

  async update(params: UpdateUserRepository.Params): Promise<UpdateUserRepository.Result> {
    this.callsCount++;
    this.params = params;
    return Promise.resolve(this.result);
  }
}

export class LogErrorRepositorySpy implements LogErrorRepository {
  params?: LogErrorRepository.Params;

  async logError(params: LogErrorRepository.Params): Promise<void> {
    this.params = params;
    return Promise.resolve();
  }
}
