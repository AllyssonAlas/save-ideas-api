import { CreateIdeiaUsecase } from '@/data/usecases';

import { mockCreateIdeiaParams } from '@/tests/domain/mocks';
import { CreateIdeiaRepositorySpy } from '@/tests/data/mocks/repositories';

interface SutTypes {
  sut: CreateIdeiaUsecase;
  createIdeiaRepositorySpy: CreateIdeiaRepositorySpy;
}

const makeSut = (): SutTypes => {
  const createIdeiaRepositorySpy = new CreateIdeiaRepositorySpy();
  const sut = new CreateIdeiaUsecase(createIdeiaRepositorySpy);

  return { sut, createIdeiaRepositorySpy };
};

describe('CreateIdeiaUsecase', () => {
  test('Should call CreateIdeiaRepository with correct value', async () => {
    const { sut, createIdeiaRepositorySpy } = makeSut();

    await sut.perform(mockCreateIdeiaParams());

    expect(createIdeiaRepositorySpy.params).toEqual({
      title: 'any_title_ideia',
      description: 'any_description_ideia',
      features: [
        {
          name: 'any_feature_name',
          description: 'any_feature_description',
          finished: false,
        },
      ],
    });
    expect(createIdeiaRepositorySpy.callsCount).toBe(1);
  });

  test('Should throw if CreateIdeiaRepository throws', async () => {
    const { sut, createIdeiaRepositorySpy } = makeSut();
    jest.spyOn(createIdeiaRepositorySpy, 'create').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockCreateIdeiaParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should return an ideia on success', async () => {
    const { sut } = makeSut();

    const loadCreateIdeiaResult = await sut.perform(mockCreateIdeiaParams());

    expect(loadCreateIdeiaResult).toEqual({
      id: 'any_id',
      title: 'any_title_ideia',
      description: 'any_description_ideia',
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
