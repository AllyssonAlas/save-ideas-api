import { DeleteIdeiaByIdUsecase } from '@/data/usecases';

import { mockLoadIdeiaByIdParams } from '@/tests/domain/mocks';
import { DeleteIdeiaByIdRepositorySpy } from '@/tests/data/mocks/repositories';

interface SutTypes {
  sut: DeleteIdeiaByIdUsecase;
  deleteIdeiaByIdRepositorySpy: DeleteIdeiaByIdRepositorySpy;
}

const makeSut = (): SutTypes => {
  const deleteIdeiaByIdRepositorySpy = new DeleteIdeiaByIdRepositorySpy();
  const sut = new DeleteIdeiaByIdUsecase(deleteIdeiaByIdRepositorySpy);
  return { sut, deleteIdeiaByIdRepositorySpy };
};

describe('DeleteIdeiaByIdUsecase', () => {
  test('Should call DeleteIdeiaRepository with correct value', async () => {
    const { sut, deleteIdeiaByIdRepositorySpy } = makeSut();

    await sut.perform(mockLoadIdeiaByIdParams());

    expect(deleteIdeiaByIdRepositorySpy.params).toEqual({ ideiaId: 'any_ideia_id' });
    expect(deleteIdeiaByIdRepositorySpy.callsCount).toBe(1);
  });
});
