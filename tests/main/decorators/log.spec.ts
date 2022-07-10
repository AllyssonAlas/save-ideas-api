import { Controller, HttpResponse } from '@/presentation/protocols';
import { LogControllerDecorator } from '@/main/decorators';
import { noContent, serverError } from '@/presentation/helpers';

import { LogErrorRepositorySpy } from '@/tests/data/mocks';

class ControllerSpy implements Controller {
  httpResponse = noContent();
  request: any;

  async handle(request: any): Promise<HttpResponse> {
    this.request = request;
    return Promise.resolve(this.httpResponse);
  }
}

const mockServerError = (): HttpResponse => {
  const fakeError = new Error();
  fakeError.stack = 'any_stack';
  return serverError(fakeError);
};

interface SutTypes {
  sut: LogControllerDecorator;
  controllerSpy: ControllerSpy;
  logErrorRepositorySpy: LogErrorRepositorySpy;
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy();
  const logErrorRepositorySpy = new LogErrorRepositorySpy();
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy);
  return { sut, controllerSpy, logErrorRepositorySpy };
};

describe('LogControllerDecorator', () => {
  test('Should call controller handle', () => {
    const { sut, controllerSpy } = makeSut();

    sut.handle({ value: 'any_value' });

    expect(controllerSpy.request).toEqual({ value: 'any_value' });
  });

  test('Should return the same result of the controller handle', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({ value: 'any_value' });

    expect(httpResponse).toEqual(noContent());
  });

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut();
    const serverError = mockServerError();
    controllerSpy.httpResponse = serverError;

    await sut.handle({ value: 'any_value' });

    expect(logErrorRepositorySpy.params?.stack).toEqual(serverError.body.stack);
  });
});
