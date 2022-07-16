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

export const mockUpdaterUserParams = (): UpdateUser.Params => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  passwordHash: 'any_hashed_password',
});

export const mockUpdaterUserParamsWithNewPassword = (): UpdateUser.Params => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  newPassword: 'other_password',
  password: 'any_password',
  passwordHash: 'any_hashed_password',
});
