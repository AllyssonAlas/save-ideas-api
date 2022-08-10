import { ListIdeiasController } from '@/presentation/controllers';

import { ListIdeiasUsecaseSpy } from '@/tests/presentation/mocks';

const mockRequest = (): ListIdeiasController.Request => ({
  userId: 'any_id',
});

interface SutTypes {
  sut: ListIdeiasController;
  listIdeiasUsecaseSpy: ListIdeiasUsecaseSpy;
}

const makeSut = (): SutTypes => {
  const listIdeiasUsecaseSpy = new ListIdeiasUsecaseSpy();
  const sut = new ListIdeiasController(listIdeiasUsecaseSpy);
  return { sut, listIdeiasUsecaseSpy };
};

describe('ListIdeiasController', () => {
  test('Should call ListIdeiasUsecase with correct value', async () => {
    const { sut, listIdeiasUsecaseSpy } = makeSut();
    const request = mockRequest();

    await sut.handle(request);

    expect(listIdeiasUsecaseSpy.params).toEqual(request);
    expect(listIdeiasUsecaseSpy.callsCount).toBe(1);
  });
});
