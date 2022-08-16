import { CreateIdeaUsecase } from '@/data/usecases';

import { mockCreateIdeaParams } from '@/tests/domain/mocks';
import { CreateIdeaRepositorySpy } from '@/tests/data/mocks/repositories';

interface SutTypes {
  sut: CreateIdeaUsecase;
  createIdeaRepositorySpy: CreateIdeaRepositorySpy;
}

const makeSut = (): SutTypes => {
  const createIdeaRepositorySpy = new CreateIdeaRepositorySpy();
  const sut = new CreateIdeaUsecase(createIdeaRepositorySpy);

  return { sut, createIdeaRepositorySpy };
};

describe('CreateIdeaUsecase', () => {
  test('Should call CreateIdeaRepository with correct value', async () => {
    const { sut, createIdeaRepositorySpy } = makeSut();

    await sut.perform(mockCreateIdeaParams());

    expect(createIdeaRepositorySpy.params).toEqual({
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
    expect(createIdeaRepositorySpy.callsCount).toBe(1);
  });

  test('Should throw if CreateIdeaRepository throws', async () => {
    const { sut, createIdeaRepositorySpy } = makeSut();
    jest.spyOn(createIdeaRepositorySpy, 'create').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockCreateIdeaParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should return an idea on success', async () => {
    const { sut } = makeSut();

    const createIdeaResult = await sut.perform(mockCreateIdeaParams());

    expect(createIdeaResult).toEqual({
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
