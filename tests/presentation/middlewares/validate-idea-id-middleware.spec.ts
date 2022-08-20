import { ValidateIdeaIdMiddleware } from '@/presentation/middlewares';
import { InvalidParamError } from '@/presentation/errors';
import { forbidden, ok, serverError } from '@/presentation/helpers';

import { LoadIdeaByIdUsecaseSpy } from '@/tests/presentation/mocks';

const mockRequest = (): ValidateIdeaIdMiddleware.Request => ({
  ideaId: 'any_idea_id',
  userId: 'any_user_id',
});

interface SutTypes {
  sut: ValidateIdeaIdMiddleware;
  loadIdeaByIdUsecaseSpy: LoadIdeaByIdUsecaseSpy;
}

const makeSut = (): SutTypes => {
  const loadIdeaByIdUsecaseSpy = new LoadIdeaByIdUsecaseSpy();
  const sut = new ValidateIdeaIdMiddleware(loadIdeaByIdUsecaseSpy);
  return { sut, loadIdeaByIdUsecaseSpy };
};

describe('ValidateIdeaIdMiddleware', () => {
  test('Should call LoadIdeaByIdUsescase with correct ideaId', async () => {
    const { sut, loadIdeaByIdUsecaseSpy } = makeSut();

    await sut.handle(mockRequest());

    expect(loadIdeaByIdUsecaseSpy.params).toEqual({ ideaId: 'any_idea_id' });
  });

  test('Should return 500 if LoadIdeaByIdUsescase throws', async () => {
    const { sut, loadIdeaByIdUsecaseSpy } = makeSut();
    jest.spyOn(loadIdeaByIdUsecaseSpy, 'perform').mockImplementation(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 403 if ideaId is invalid', async () => {
    const { sut, loadIdeaByIdUsecaseSpy } = makeSut();
    loadIdeaByIdUsecaseSpy.result = null;

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('ideaId')));
  });

  test('Should return 403 if idea ownerId is different from userId', async () => {
    const { sut, loadIdeaByIdUsecaseSpy } = makeSut();
    loadIdeaByIdUsecaseSpy.result!.ownerId = 'other_user_id';

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('ideaId')));
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(ok({ ideaId: 'any_idea_id' }));
  });
});
