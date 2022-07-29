import { CreateIdeiaUsecase } from '@/data/usecases';

import { CreateIdeiaRepositorySpy } from '@/tests/data/mocks/repositories';

describe('CreateIdeiaUsecase', () => {
  test('Should call CreateIdeiaRepository with correct value', async () => {
    const createIdeiaRepositorySpy = new CreateIdeiaRepositorySpy();
    const sut = new CreateIdeiaUsecase(createIdeiaRepositorySpy);

    await sut.perform({
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
  });
});
