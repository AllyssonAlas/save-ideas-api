import { LoadIdeiaByIdUsecase } from '@/data/usecases';

import { mockLoadIdeiaByIdParams } from '@/tests/domain/mocks';
import { LoadIdeiaByIdRepositorySpy } from '@/tests/data/mocks/repositories';

interface SutTypes {
  sut: LoadIdeiaByIdUsecase;
  loadIdeiaByIdRepositorySpy: LoadIdeiaByIdRepositorySpy;
}

const makeSut = (): SutTypes => {
  const loadIdeiaByIdRepositorySpy = new LoadIdeiaByIdRepositorySpy();
  const sut = new LoadIdeiaByIdUsecase(loadIdeiaByIdRepositorySpy);
  return { sut, loadIdeiaByIdRepositorySpy };
};

describe('LoadIdeiaByIdUsecase', () => {
  test('Should call LoadIdeiaByIdRepository with correct value', async () => {
    const { sut, loadIdeiaByIdRepositorySpy } = makeSut();

    await sut.perform(mockLoadIdeiaByIdParams());

    expect(loadIdeiaByIdRepositorySpy.params).toEqual({ ideiaId: 'any_ideia_id' });
    expect(loadIdeiaByIdRepositorySpy.callsCount).toBe(1);
  });

  test('Should throw if LoadIdeiaByIdRepository throws', async () => {
    const { sut, loadIdeiaByIdRepositorySpy } = makeSut();
    jest.spyOn(loadIdeiaByIdRepositorySpy, 'load').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockLoadIdeiaByIdParams());

    await expect(promise).rejects.toThrow();
  });
});
