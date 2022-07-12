import { Authentication, SignUp } from '@/domain/usecases';

export class SignUpSpy implements SignUp {
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
