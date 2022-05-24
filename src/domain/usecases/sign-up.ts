import { SignUpError } from '@/domain/errors';

export namespace SignUp {
  export type Params = {
    name: string;
    email: string;
    password: string;
  };

  export type Result = { name: string; email: string } | SignUpError;
}

export interface SignUp {
  perform: (params: SignUp.Params) => Promise<SignUp.Result | SignUpError>;
}
