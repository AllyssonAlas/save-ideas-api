import { Controller } from '@/presentation/protocols';
import { LogControllerDecorator } from '@/main/decorators/log';
import { makeLogRepository } from '@/main/factories/repositories';

export const makeLogErrorDecorator = (controller: Controller): Controller => {
  return new LogControllerDecorator(controller, makeLogRepository());
};
