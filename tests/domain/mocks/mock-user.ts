import { SignUp, Authentication, UpdateUser } from '@/domain/usecases';

export const mockSignUpParams = (): SignUp.Params => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: 'any_email@email.com',
  password: 'any_password',
});

export const mockUpdaterUserParamsWithOldPassword = (): UpdateUser.Params => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'other_password',
  oldPassword: 'any_password',
  oldPasswordHash: 'any_hashed_password',
});
