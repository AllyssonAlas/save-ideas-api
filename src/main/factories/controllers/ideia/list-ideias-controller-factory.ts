import { Controller } from '@/presentation/protocols';
import { ListIdeiasController } from '@/presentation/controllers';
import { makeListIdeiasUsecase } from '@/main/factories/usecases';
import { makeLogErrorDecorator } from '@/main/factories/decorators';

export const makeListIdeiasController = (): Controller => {
  const listIdeiasController = new ListIdeiasController(makeListIdeiasUsecase());
  return makeLogErrorDecorator(listIdeiasController);
};
