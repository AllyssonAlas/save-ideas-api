import { ListIdeiasController } from '@/presentation/controllers';
import { noContent, ok, serverError } from '@/presentation/helpers';

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

  test('Should return 204 on empty ideas list', async () => {
    const { sut, listIdeiasUsecaseSpy } = makeSut();
    listIdeiasUsecaseSpy.result = [];

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(noContent());
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(
      ok([
        {
          id: 'any_id',
          ownerId: 'any_user_id',
          title: 'any_title_ideia',
          description: 'any_description_ideia',
          features: [
            {
              name: 'any_feature_name',
              description: 'any_feature_description',
              finished: false,
            },
          ],
        },
        {
          id: 'any_id',
          ownerId: 'any_user_id',
          title: 'any_title_ideia',
          description: 'any_description_ideia',
          features: [
            {
              name: 'any_feature_name',
              description: 'any_feature_description',
              finished: false,
            },
          ],
        },
      ]),
    );
  });
});
