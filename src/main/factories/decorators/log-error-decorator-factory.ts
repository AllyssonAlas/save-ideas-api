import { Controller } from '@/presentation/protocols';
import { LogControllerDecorator } from '@/main/decorators/log';
import { LogRepository } from '@/infra/db';

export const makeLogErrorDecorator = (controller: Controller): Controller => {
  const logRepository = new LogRepository();
  return new LogControllerDecorator(controller, logRepository);
};
