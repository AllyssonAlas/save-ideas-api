import { Controller, HttpResponse } from '@/presentation/protocols';
import { LogControllerDecorator } from '@/main/decorators';
import { noContent } from '@/presentation/helpers';

class ControllerSpy implements Controller {
  httpResponse = noContent();
  request: any;

  async handle(request: any): Promise<HttpResponse> {
    this.request = request;
    return Promise.resolve(this.httpResponse);
  }
}

interface SutTypes {
  sut: LogControllerDecorator;
  controllerSpy: ControllerSpy;
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy();
  const sut = new LogControllerDecorator(controllerSpy);
  return { sut, controllerSpy };
};

describe('LogControllerDecorator', () => {
  test('Should call controller handle', () => {
    const { sut, controllerSpy } = makeSut();

    sut.handle({ value: 'any_value' });

    expect(controllerSpy.request).toEqual({ value: 'any_value' });
  });
});
