import {
  Authentication,
  LoadUserById,
  LoadUserByToken,
  SignUp,
  UpdateUser,
} from '@/domain/usecases';

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: 'any_email@email.com',
  password: 'any_password',
});

export const mockLoadUserByIdParams = (): LoadUserById.Params => ({
  id: 'any_id',
});

export const mockLoadUserByTokenParams = (): LoadUserByToken.Params => ({
  accessToken: 'any_token',
});

export const mockSignUpParams = (): SignUp.Params => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

export const mockUpdateUserParams = (): UpdateUser.Params => ({
  userId: 'any_id',
  name: 'other_name',
  email: 'any_email@mail.com',
});

export const mockUpdateUserWithAdditionalValuesParams = (): UpdateUser.Params => ({
  userId: 'any_id',
  name: 'any_name',
  email: 'other_email@mail.com',
  password: 'any_password',
  newPassword: 'other_password',
});
