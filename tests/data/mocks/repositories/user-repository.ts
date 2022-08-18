import {
  CreateUserRepository,
  LoadUserByIdRepository,
  LoadUserByFieldRepository,
  UpdateUserRepository,
  DeleteUserRepository,
} from '@/data/protocols/repositories';

export class LoadUserByFielRepositorySpy implements LoadUserByFieldRepository {
  params?: LoadUserByFieldRepository.Params;
  result: LoadUserByFieldRepository.Result = {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    accessToken: 'any_access_token',
  };

  callsCount = 0;

  async loadByField(
    params: LoadUserByFieldRepository.Params,
  ): Promise<LoadUserByFieldRepository.Result> {
    this.callsCount++;
    this.params = params;
    return Promise.resolve(this.result);
  }
}

export class LoadUserByIdRepositorySpy implements LoadUserByIdRepository {
  params?: LoadUserByIdRepository.Params;
  result: LoadUserByIdRepository.Result = {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    accessToken: 'any_access_token',
  };

  callsCount = 0;

  async loadById(params: LoadUserByIdRepository.Params): Promise<LoadUserByIdRepository.Result> {
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

export class DeleteUserRepositorySpy implements DeleteUserRepository {
  params?: DeleteUserRepository.Params;

  callsCount = 0;

  async delete(params: DeleteUserRepository.Params): Promise<DeleteUserRepository.Result> {
    this.callsCount++;
    this.params = params;
    return Promise.resolve();
  }
}
