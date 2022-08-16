import { ListIdeasController } from '@/presentation/controllers';
import { noContent, ok, serverError } from '@/presentation/helpers';

import { ListIdeasUsecaseSpy } from '@/tests/presentation/mocks';

const mockRequest = (): ListIdeasController.Request => ({
  userId: 'any_id',
});

interface SutTypes {
  sut: ListIdeasController;
  listIdeasUsecaseSpy: ListIdeasUsecaseSpy;
}

const makeSut = (): SutTypes => {
  const listIdeasUsecaseSpy = new ListIdeasUsecaseSpy();
  const sut = new ListIdeasController(listIdeasUsecaseSpy);
  return { sut, listIdeasUsecaseSpy };
};

describe('ListIdeasController', () => {
  test('Should call ListIdeasUsecase with correct value', async () => {
    const { sut, listIdeasUsecaseSpy } = makeSut();
    const request = mockRequest();

    await sut.handle(request);

    expect(listIdeasUsecaseSpy.params).toEqual(request);
    expect(listIdeasUsecaseSpy.callsCount).toBe(1);
  });

  test('Should return 500 if ListIdeasUsecase throws', async () => {
    const { sut, listIdeasUsecaseSpy } = makeSut();
    jest.spyOn(listIdeasUsecaseSpy, 'perform').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 204 on empty ideas list', async () => {
    const { sut, listIdeasUsecaseSpy } = makeSut();
    listIdeasUsecaseSpy.result = [];

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
          title: 'any_title_idea',
          description: 'any_description_idea',
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
          title: 'any_title_idea',
          description: 'any_description_idea',
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
