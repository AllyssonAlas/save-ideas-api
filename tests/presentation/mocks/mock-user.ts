import { Authentication, SignUp, LoadUserById, LoadUserByToken } from '@/domain/usecases';

export class SignUpUsecaseSpy implements SignUp {
  params?: SignUp.Params;
  result = { wasSigned: true };
  callsCount = 0;

  async perform(params: SignUp.Params): Promise<SignUp.Result> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.result);
  }
}

export class AuthenticationUsecaseSpy implements Authentication {
  params?: Authentication.Params;
  result: Authentication.Result = {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    accessToken: 'any_access_token',
  };

  callsCount = 0;

  async perform(params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.result);
  }
}

export class LoadUserByIdUsecaseSpy implements LoadUserById {
  params?: LoadUserById.Params;
  result: LoadUserById.Result = {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_hashed_password',
    accessToken: 'any_access_token',
  };

  callsCount = 0;

  async perform(params: LoadUserById.Params): Promise<LoadUserById.Result> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.result);
  }
}

export class LoadUserByTokenUsecaseSpy implements LoadUserByToken {
  params?: LoadUserByToken.Params;
  result: LoadUserByToken.Result = {
    id: 'any_id',
  };

  callsCount = 0;

  async perform(params: LoadUserByToken.Params): Promise<LoadUserByToken.Result> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.result);
  }
}
