import { Authentication, SignUp, LoadUser, UpdateUser } from '@/domain/usecases';

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

export class LoadUserUsecaseSpy implements LoadUser {
  params?: LoadUser.Params;
  result: LoadUser.Result = {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_hashed_password',
    accessToken: 'any_access_token',
  };

  callsCount = 0;

  async perform(params: LoadUser.Params): Promise<LoadUser.Result> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.result);
  }
}

export class UpdateUserUsecaseSpy implements UpdateUser {
  params?: UpdateUser.Params;
  result = { wasSuccessful: true };
  callsCount = 0;

  async perform(params: UpdateUser.Params): Promise<UpdateUser.Result> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.result);
  }
}
