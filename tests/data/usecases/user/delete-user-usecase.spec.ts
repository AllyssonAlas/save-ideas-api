import { DeleteUserUsecase } from '@/data/usecases';

import { mockDeleteUserParams } from '@/tests/domain/mocks';
import { DeleteIdeasByOwnerIdRepositorySpy } from '@/tests/data/mocks';

interface SutTypes {
  sut: DeleteUserUsecase;
  deleteIdeasByOwnerIdRepositorySpy: DeleteIdeasByOwnerIdRepositorySpy;
}

const makeSut = (): SutTypes => {
  const deleteIdeasByOwnerIdRepositorySpy = new DeleteIdeasByOwnerIdRepositorySpy();
  const sut = new DeleteUserUsecase(deleteIdeasByOwnerIdRepositorySpy);
  return { sut, deleteIdeasByOwnerIdRepositorySpy };
};

describe('DeleteUserUsecase', () => {
  test('Should call DeleteIdeasByOwnerIdRepository with correct value', async () => {
    const { sut, deleteIdeasByOwnerIdRepositorySpy } = makeSut();

    await sut.perform(mockDeleteUserParams());

    expect(deleteIdeasByOwnerIdRepositorySpy.params).toEqual({ ownerId: 'any_user_id' });
    expect(deleteIdeasByOwnerIdRepositorySpy.callsCount).toBe(1);
  });
});
