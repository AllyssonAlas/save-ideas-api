import { Controller } from '@/presentation/protocols';
import { UpdateIdeaController } from '@/presentation/controllers';
import { makeUpdateIdeaUsecase } from '@/main/factories/usecases';
import { makeUpdateIdeaValidation } from '@/main/factories/validations';
import { makeLogErrorDecorator } from '@/main/factories/decorators';

export const makeUpdateIdeaController = (): Controller => {
  const updateIdeaController = new UpdateIdeaController(
    makeUpdateIdeaValidation(),
    makeUpdateIdeaUsecase(),
  );
  return makeLogErrorDecorator(updateIdeaController);
};
