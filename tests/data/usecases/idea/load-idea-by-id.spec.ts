import { LoadIdeaByIdUsecase } from '@/data/usecases';

import { mockLoadIdeaByIdParams } from '@/tests/domain/mocks';
import { LoadIdeaByIdRepositorySpy } from '@/tests/data/mocks/repositories';

interface SutTypes {
  sut: LoadIdeaByIdUsecase;
  loadIdeaByIdRepositorySpy: LoadIdeaByIdRepositorySpy;
}

const makeSut = (): SutTypes => {
  const loadIdeaByIdRepositorySpy = new LoadIdeaByIdRepositorySpy();
  const sut = new LoadIdeaByIdUsecase(loadIdeaByIdRepositorySpy);
  return { sut, loadIdeaByIdRepositorySpy };
};

describe('LoadIdeaByIdUsecase', () => {
  test('Should call LoadIdeaByIdRepository with correct value', async () => {
    const { sut, loadIdeaByIdRepositorySpy } = makeSut();

    await sut.perform(mockLoadIdeaByIdParams());

    expect(loadIdeaByIdRepositorySpy.params).toEqual({ ideaId: 'any_idea_id' });
    expect(loadIdeaByIdRepositorySpy.callsCount).toBe(1);
  });

  test('Should throw if LoadIdeaByIdRepository throws', async () => {
    const { sut, loadIdeaByIdRepositorySpy } = makeSut();
    jest.spyOn(loadIdeaByIdRepositorySpy, 'load').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockLoadIdeaByIdParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should return null if LoadIdeaByIdRepository returns null', async () => {
    const { sut, loadIdeaByIdRepositorySpy } = makeSut();
    loadIdeaByIdRepositorySpy.result = null;

    const loadIdeaByIdResult = await sut.perform(mockLoadIdeaByIdParams());

    expect(loadIdeaByIdResult).toBeNull();
  });

  test('Should return an idea on success', async () => {
    const { sut } = makeSut();

    const loadIdeaByIdResult = await sut.perform(mockLoadIdeaByIdParams());

    expect(loadIdeaByIdResult?.id).toBe('any_id');
    expect(loadIdeaByIdResult?.ownerId).toBe('any_user_id');
    expect(loadIdeaByIdResult?.title).toBe('any_title_idea');
  });
});
