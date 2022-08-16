import { UpdateIdeaUsecase } from '@/data/usecases';

import { mockUpdateIdeaParams } from '@/tests/domain/mocks';
import { UpdateIdeaRepositorySpy } from '@/tests/data/mocks/repositories';

interface SutTypes {
  sut: UpdateIdeaUsecase;
  updateIdeaRepositorySpy: UpdateIdeaRepositorySpy;
}

const makeSut = (): SutTypes => {
  const updateIdeaRepositorySpy = new UpdateIdeaRepositorySpy();
  const sut = new UpdateIdeaUsecase(updateIdeaRepositorySpy);
  return { sut, updateIdeaRepositorySpy };
};

describe('UpdateIdeaUsecase', () => {
  test('Should call UpdateIdeaRepository with correct value', async () => {
    const { sut, updateIdeaRepositorySpy } = makeSut();

    await sut.perform(mockUpdateIdeaParams());

    expect(updateIdeaRepositorySpy.params).toEqual({
      id: 'any_idea_id',
      title: 'other_title_idea',
      description: 'other_description_idea',
    });
    expect(updateIdeaRepositorySpy.callsCount).toBe(1);
  });
});
