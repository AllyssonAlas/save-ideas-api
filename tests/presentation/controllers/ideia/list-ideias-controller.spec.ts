import { ListIdeiasController } from '@/presentation/controllers';
import { serverError } from '@/presentation/helpers';

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

  test('Should return 500 if ListIdeiasUsecase throws', async () => {
    const { sut, listIdeiasUsecaseSpy } = makeSut();
    jest.spyOn(listIdeiasUsecaseSpy, 'perform').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
