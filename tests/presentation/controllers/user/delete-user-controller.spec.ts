import { DeleteUserController } from '@/presentation/controllers';
import { noContent, serverError } from '@/presentation/helpers';

import { DeleteUserUsecaseSpy } from '@/tests/presentation/mocks';

const mockRequest = (): DeleteUserController.Request => ({
  userId: 'any_user_id',
});

interface SutTypes {
  sut: DeleteUserController;
  deleteUserUsecaseSpy: DeleteUserUsecaseSpy;
}

const makeSut = (): SutTypes => {
  const deleteUserUsecaseSpy = new DeleteUserUsecaseSpy();
  const sut = new DeleteUserController(deleteUserUsecaseSpy);
  return { sut, deleteUserUsecaseSpy };
};

describe('UpdateUserController', () => {
  test('Should call DeleteUserUsecase with correct values', async () => {
    const { sut, deleteUserUsecaseSpy } = makeSut();

    await sut.handle(mockRequest());

    expect(deleteUserUsecaseSpy.params).toEqual({ id: 'any_user_id' });
    expect(deleteUserUsecaseSpy.callsCount).toBe(1);
  });

  test('Should return 500 if DeleteUserUsecase throws', async () => {
    const { sut, deleteUserUsecaseSpy } = makeSut();
    jest.spyOn(deleteUserUsecaseSpy, 'perform').mockImplementation(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 204 on success', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(noContent());
  });
});
