import { Controller } from '@/presentation/protocols';
import { CreateIdeaController } from '@/presentation/controllers';
import { makeCreateIdeaUsecase } from '@/main/factories/usecases';
import { makeCreateIdeaValidation } from '@/main/factories/validations';
import { makeLogErrorDecorator } from '@/main/factories/decorators';

export const makeCreateIdeaController = (): Controller => {
  const createIdeaController = new CreateIdeaController(
    makeCreateIdeaValidation(),
    makeCreateIdeaUsecase(),
  );
  return makeLogErrorDecorator(createIdeaController);
};
