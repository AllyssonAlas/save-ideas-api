import { SignUpUsecase } from '@/data/usecases';

import { mockSignUpParams } from '@/tests/domain/mocks';
import {
  HasherSpy,
  CreateUserRepositorySpy,
  LoadUserByEmailRepositorySpy,
} from '@/tests/data/mocks';

interface SutTypes {
  hasherSpy: HasherSpy;
  loadUserByEmailRepositorySpy: LoadUserByEmailRepositorySpy;
  createUserRepositorySpy: CreateUserRepositorySpy;
  sut: SignUpUsecase;
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy();
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
  loadUserByEmailRepositorySpy.result = null;
  const createUserRepositorySpy = new CreateUserRepositorySpy();
  const sut = new SignUpUsecase(hasherSpy, loadUserByEmailRepositorySpy, createUserRepositorySpy);

  return { sut, hasherSpy, loadUserByEmailRepositorySpy, createUserRepositorySpy };
};

describe('SignUpUsecase', () => {
  test('Should call Hasher with correct value', async () => {
    const { sut, hasherSpy } = makeSut();
    const userData = mockSignUpParams();

    await sut.perform(userData);

    expect(hasherSpy.params).toEqual({ plaintext: userData.password });
    expect(hasherSpy.callsCount).toBe(1);
  });

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut();
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockSignUpParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should call LoadUserByFieldRepository with correct value', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();
    const userData = mockSignUpParams();

    await sut.perform(userData);

    expect(loadUserByEmailRepositorySpy.params).toEqual({ email: userData.email });
    expect(loadUserByEmailRepositorySpy.callsCount).toBe(1);
  });

  test('Should throw if LoadUserByFieldRepository throws', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();
    jest.spyOn(loadUserByEmailRepositorySpy, 'loadByField').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockSignUpParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should return SignUpError when LoadUserByFieldRepository returns user data', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();
    jest.spyOn(loadUserByEmailRepositorySpy, 'loadByField').mockReturnValueOnce(
      Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_access_token',
      }),
    );

    const signUpResult = await sut.perform(mockSignUpParams());

    expect(signUpResult).toEqual({ wasSigned: false });
  });

  test('Should call CreateUserRepository with correct values if LoadUserByFieldRepository returns null', async () => {
    const { sut, createUserRepositorySpy } = makeSut();

    await sut.perform(mockSignUpParams());

    expect(createUserRepositorySpy.params).toEqual({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password',
    });
    expect(createUserRepositorySpy.callsCount).toBe(1);
  });

  test('Should throw if CreateUserRepository throws', async () => {
    const { sut, createUserRepositorySpy } = makeSut();
    jest.spyOn(createUserRepositorySpy, 'create').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockSignUpParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should return the name and email from created user', async () => {
    const { sut } = makeSut();

    const userData = await sut.perform(mockSignUpParams());

    expect(userData).toBeTruthy();
  });
});