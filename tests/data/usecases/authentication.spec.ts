import { AuthenticationUsecase } from '@/data/usecases';

import { LoadUserRepositorySpy } from '@/tests/data/mocks';

describe('AuthenticationUsecase', () => {
  test('Should call LoadUserRepository with correct value', () => {
    const loadUserRepositorySpy = new LoadUserRepositorySpy();
    const sut = new AuthenticationUsecase(loadUserRepositorySpy);
    const authenticationParams = {
      email: 'any_email@email.com',
      password: 'any_password',
    };

    sut.perform(authenticationParams);

    expect(loadUserRepositorySpy.params).toEqual({ email: 'any_email@email.com' });
    expect(loadUserRepositorySpy.callsCount).toBe(1);
  });
});
