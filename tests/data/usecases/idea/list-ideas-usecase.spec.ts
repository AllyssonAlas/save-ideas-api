import { ListIdeasUsecase } from '@/data/usecases';

import { mockListIdeasParams } from '@/tests/domain/mocks';
import { ListIdeasRepositorySpy } from '@/tests/data/mocks/repositories';

interface SutTypes {
  sut: ListIdeasUsecase;
  listIdeasRepositorySpy: ListIdeasRepositorySpy;
}

const makeSut = (): SutTypes => {
  const listIdeasRepositorySpy = new ListIdeasRepositorySpy();
  const sut = new ListIdeasUsecase(listIdeasRepositorySpy);
  return { sut, listIdeasRepositorySpy };
};

describe('ListIdeasUsecase', () => {
  test('Should call ListIdeasRepository with correct value', async () => {
    const { sut, listIdeasRepositorySpy } = makeSut();

    await sut.perform(mockListIdeasParams());

    expect(listIdeasRepositorySpy.params).toEqual({ userId: 'any_user_id' });
    expect(listIdeasRepositorySpy.callsCount).toBe(1);
  });

  test('Should throw if CreateIdeaRepository throws', async () => {
    const { sut, listIdeasRepositorySpy } = makeSut();
    jest.spyOn(listIdeasRepositorySpy, 'list').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockListIdeasParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should throw if ListIdeasRepository throws', async () => {
    const { sut, listIdeasRepositorySpy } = makeSut();
    jest.spyOn(listIdeasRepositorySpy, 'list').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockListIdeasParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should return an empty list of ideas on success', async () => {
    const { sut, listIdeasRepositorySpy } = makeSut();
    listIdeasRepositorySpy.result = [];

    const listIdeasResult = await sut.perform(mockListIdeasParams());

    expect(listIdeasResult).toHaveLength(0);
    expect(listIdeasResult).toEqual([]);
  });

  test('Should return a list of ideas on success', async () => {
    const { sut } = makeSut();

    const listIdeasResult = await sut.perform(mockListIdeasParams());

    expect(listIdeasResult).toHaveLength(2);
    expect(listIdeasResult[0]).toEqual({
      id: 'any_id',
      ownerId: 'any_user_id',
      title: 'any_title_idea',
      description: 'any_description_idea',
      features: [
        {
          name: 'any_feature_name',
          description: 'any_feature_description',
          finished: false,
        },
      ],
    });
  });
});
