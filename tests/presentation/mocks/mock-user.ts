import { SignUp } from '@/domain/usecases';

export class SignUpSpy implements SignUp {
  params?: SignUp.Params;
  result = true;
  callsCount = 0;

  async perform(params: SignUp.Params): Promise<SignUp.Result> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.result);
  }
}
