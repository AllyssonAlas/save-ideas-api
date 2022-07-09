import { Controller, HttpResponse } from '@/presentation/protocols';

export class LogControllerDecorator implements Controller {
  constructor(private readonly controller: Controller) {}

  async handle(request: any): Promise<HttpResponse | any> {
    await this.controller.handle(request);
  }
}
