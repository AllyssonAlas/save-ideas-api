import { SignUp, Authentication } from '@/domain/usecases';

export const mockCreateUserParams = (): SignUp.Params => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: 'any_email@email.com',
  password: 'any_password',
});
