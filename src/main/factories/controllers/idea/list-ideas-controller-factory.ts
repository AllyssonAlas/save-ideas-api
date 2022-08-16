import { Controller } from '@/presentation/protocols';
import { ListIdeasController } from '@/presentation/controllers';
import { makeListIdeasUsecase } from '@/main/factories/usecases';
import { makeLogErrorDecorator } from '@/main/factories/decorators';

export const makeListIdeasController = (): Controller => {
  const listIdeasController = new ListIdeasController(makeListIdeasUsecase());
  return makeLogErrorDecorator(listIdeasController);
};
