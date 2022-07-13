import {
  CreateUserRepository,
  LoadUserByEmailRepository,
  LogErrorRepository,
  UpdateUserRepository,
} from '@/data/protocols/repositories';

export class LoadUserByEmailRepositorySpy implements LoadUserByEmailRepository {
  params?: LoadUserByEmailRepository.Params;
  result: LoadUserByEmailRepository.Result = {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    accessToken: 'any_access_token',
  };

  callsCount = 0;

  async load(params: LoadUserByEmailRepository.Params): Promise<LoadUserByEmailRepository.Result> {
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

  callsCount = 0;

  async update(params: UpdateUserRepository.Params): Promise<UpdateUserRepository.Result> {
    this.callsCount++;
    this.params = params;
    return Promise.resolve();
  }
}

export class LogErrorRepositorySpy implements LogErrorRepository {
  params?: LogErrorRepository.Params;

  async logError(params: LogErrorRepository.Params): Promise<void> {
    this.params = params;
    return Promise.resolve();
  }
}
