import { Controller } from '@/presentation/protocols';
import { CreateIdeiaController } from '@/presentation/controllers';
import { makeCreateIdeiaUsecase } from '@/main/factories/usecases';
import { makeCreateIdeiaValidation } from '@/main/factories/validations';
import { makeLogErrorDecorator } from '@/main/factories/decorators';

export const makeCreateIdeiaController = (): Controller => {
  const createIdeiaController = new CreateIdeiaController(
    makeCreateIdeiaValidation(),
    makeCreateIdeiaUsecase(),
  );
  return makeLogErrorDecorator(createIdeiaController);
};
