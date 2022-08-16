import { Controller } from '@/presentation/protocols';
import { DeleteIdeaController } from '@/presentation/controllers';
import { makeDeleteIdeaByIdUsecase } from '@/main/factories/usecases';
import { makeLogErrorDecorator } from '@/main/factories/decorators';

export const makeDeleteIdeaController = (): Controller => {
  const deleteIdeaController = new DeleteIdeaController(makeDeleteIdeaByIdUsecase());
  return makeLogErrorDecorator(deleteIdeaController);
};
