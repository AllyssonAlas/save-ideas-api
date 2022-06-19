import { SignUpError } from '@/domain/errors';

export namespace SignUp {
  export type Params = {
    name: string;
    email: string;
    password: string;
  };

  export type Result = boolean | SignUpError;
}

export interface SignUp {
  perform: (params: SignUp.Params) => Promise<SignUp.Result | SignUpError>;
}
