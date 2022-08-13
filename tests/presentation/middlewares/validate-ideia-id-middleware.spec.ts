import { ValidateIdeiaIdMiddleware } from '@/presentation/middlewares';
import { MissingParamError } from '@/presentation/errors';
import { forbidden } from '@/presentation/helpers';

interface SutTypes {
  sut: ValidateIdeiaIdMiddleware;
}

const makeSut = (): SutTypes => {
  const sut = new ValidateIdeiaIdMiddleware();
  return { sut };
};

describe('AuthMiddleware', () => {
  test('Should return 403 if there is no ideiaId on request', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({});

    expect(httpResponse).toEqual(forbidden(new MissingParamError('ideiaId')));
  });
});
