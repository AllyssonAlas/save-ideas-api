import { DeleteUserUsecase } from '@/data/usecases';

import { mockDeleteUserParams } from '@/tests/domain/mocks';
import { DeleteIdeasByOwnerIdRepositorySpy, DeleteUserRepositorySpy } from '@/tests/data/mocks';

interface SutTypes {
  sut: DeleteUserUsecase;
  deleteIdeasByOwnerIdRepositorySpy: DeleteIdeasByOwnerIdRepositorySpy;
  deleteUserRepositorySpy: DeleteUserRepositorySpy;
}

const makeSut = (): SutTypes => {
  const deleteUserRepositorySpy = new DeleteUserRepositorySpy();
  const deleteIdeasByOwnerIdRepositorySpy = new DeleteIdeasByOwnerIdRepositorySpy();
  const sut = new DeleteUserUsecase(deleteIdeasByOwnerIdRepositorySpy, deleteUserRepositorySpy);
  return { sut, deleteIdeasByOwnerIdRepositorySpy, deleteUserRepositorySpy };
};

describe('DeleteUserUsecase', () => {
  test('Should call DeleteIdeasByOwnerIdRepository with correct value', async () => {
    const { sut, deleteIdeasByOwnerIdRepositorySpy } = makeSut();

    await sut.perform(mockDeleteUserParams());

    expect(deleteIdeasByOwnerIdRepositorySpy.params).toEqual({ ownerId: 'any_user_id' });
    expect(deleteIdeasByOwnerIdRepositorySpy.callsCount).toBe(1);
  });

  test('Should throw if DeleteIdeasByOwnerIdRepository throws', async () => {
    const { sut, deleteIdeasByOwnerIdRepositorySpy } = makeSut();
    jest.spyOn(deleteIdeasByOwnerIdRepositorySpy, 'deleteByOwnerId').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockDeleteUserParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should call DeleteUserRepository with correct value', async () => {
    const { sut, deleteUserRepositorySpy } = makeSut();

    await sut.perform(mockDeleteUserParams());

    expect(deleteUserRepositorySpy.params).toEqual({ id: 'any_user_id' });
    expect(deleteUserRepositorySpy.callsCount).toBe(1);
  });

  test('Should throw if DeleteUserRepository throws', async () => {
    const { sut, deleteUserRepositorySpy } = makeSut();
    jest.spyOn(deleteUserRepositorySpy, 'delete').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockDeleteUserParams());

    await expect(promise).rejects.toThrow();
  });
});
