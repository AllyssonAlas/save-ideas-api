import { ListIdeiasUsecase } from '@/data/usecases';

import { mockListIdeiasParams } from '@/tests/domain/mocks';
import { ListIdeiasRepositorySpy } from '@/tests/data/mocks/repositories';

interface SutTypes {
  sut: ListIdeiasUsecase;
  listIdeiasRepositorySpy: ListIdeiasRepositorySpy;
}

const makeSut = (): SutTypes => {
  const listIdeiasRepositorySpy = new ListIdeiasRepositorySpy();
  const sut = new ListIdeiasUsecase(listIdeiasRepositorySpy);
  return { sut, listIdeiasRepositorySpy };
};

describe('ListIdeiasUsecase', () => {
  test('Should call ListIdeiasRepository with correct value', async () => {
    const { sut, listIdeiasRepositorySpy } = makeSut();

    await sut.perform(mockListIdeiasParams());

    expect(listIdeiasRepositorySpy.params).toEqual({ userId: 'any_user_id' });
    expect(listIdeiasRepositorySpy.callsCount).toBe(1);
  });

  test('Should throw if CreateIdeiaRepository throws', async () => {
    const { sut, listIdeiasRepositorySpy } = makeSut();
    jest.spyOn(listIdeiasRepositorySpy, 'list').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockListIdeiasParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should throw if ListIdeiasRepository throws', async () => {
    const { sut, listIdeiasRepositorySpy } = makeSut();
    jest.spyOn(listIdeiasRepositorySpy, 'list').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.perform(mockListIdeiasParams());

    await expect(promise).rejects.toThrow();
  });
});
