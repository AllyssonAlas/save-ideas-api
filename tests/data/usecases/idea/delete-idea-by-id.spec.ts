import { DeleteIdeaByIdUsecase } from '@/data/usecases';

import { mockLoadIdeaByIdParams } from '@/tests/domain/mocks';
import { DeleteIdeaByIdRepositorySpy } from '@/tests/data/mocks/repositories';

interface SutTypes {
  sut: DeleteIdeaByIdUsecase;
  deleteIdeaByIdRepositorySpy: DeleteIdeaByIdRepositorySpy;
}

const makeSut = (): SutTypes => {
  const deleteIdeaByIdRepositorySpy = new DeleteIdeaByIdRepositorySpy();
  const sut = new DeleteIdeaByIdUsecase(deleteIdeaByIdRepositorySpy);
  return { sut, deleteIdeaByIdRepositorySpy };
};

describe('DeleteIdeaByIdUsecase', () => {
  test('Should call DeleteIdeaRepository with correct value', async () => {
    const { sut, deleteIdeaByIdRepositorySpy } = makeSut();

    await sut.perform(mockLoadIdeaByIdParams());

    expect(deleteIdeaByIdRepositorySpy.params).toEqual({ ideaId: 'any_idea_id' });
    expect(deleteIdeaByIdRepositorySpy.callsCount).toBe(1);
  });

  test('Should throw if DeleteIdeaRepository throws', async () => {
    const { sut, deleteIdeaByIdRepositorySpy } = makeSut();
    jest.spyOn(deleteIdeaByIdRepositorySpy, 'deleteById').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockLoadIdeaByIdParams());

    await expect(promise).rejects.toThrow();
  });
});
