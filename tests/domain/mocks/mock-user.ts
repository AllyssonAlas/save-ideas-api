import { SignUp } from '@/domain/usecases';

export const mockCreateUserParams = (): SignUp.Params => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});
