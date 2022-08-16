import { DeleteIdeaController } from '@/presentation/controllers';
import { serverError } from '@/presentation/helpers';

import { DeleteIdeaByIdUsecaseSpy } from '@/tests/presentation/mocks';

const mockRequest = (): DeleteIdeaController.Request => ({
  ideaId: 'any_id',
});

interface SutTypes {
  sut: DeleteIdeaController;
  deleteIdeaByIdUsecaseSpy: DeleteIdeaByIdUsecaseSpy;
}

const makeSut = (): SutTypes => {
  const deleteIdeaByIdUsecaseSpy = new DeleteIdeaByIdUsecaseSpy();
  const sut = new DeleteIdeaController(deleteIdeaByIdUsecaseSpy);
  return { sut, deleteIdeaByIdUsecaseSpy };
};

describe('DeleteIdeaController', () => {
  test('Should call DeleteIdeaUsecase with correct value', async () => {
    const { sut, deleteIdeaByIdUsecaseSpy } = makeSut();
    const request = mockRequest();

    await sut.handle(request);

    expect(deleteIdeaByIdUsecaseSpy.params).toEqual(request);
    expect(deleteIdeaByIdUsecaseSpy.callsCount).toBe(1);
  });

  test('Should return 500 if DeleteIdeaUsecase throws', async () => {
    const { sut, deleteIdeaByIdUsecaseSpy } = makeSut();
    jest.spyOn(deleteIdeaByIdUsecaseSpy, 'perform').mockImplementation(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
