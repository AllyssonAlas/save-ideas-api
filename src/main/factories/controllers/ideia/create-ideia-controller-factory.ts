import { Controller } from '@/presentation/protocols';
import { CreateIdeiaController } from '@/presentation/controllers';
import { makeLoadUserByIdUseCase, makeCreateIdeiaUsecase } from '@/main/factories/usecases';
import { makeCreateIdeiaValidation } from '@/main/factories/validations';
import { makeLogErrorDecorator } from '@/main/factories/decorators';

export const makeCreateIdeiaController = (): Controller => {
  const createIdeiaController = new CreateIdeiaController(
    makeCreateIdeiaValidation(),
    makeLoadUserByIdUseCase(),
    makeCreateIdeiaUsecase(),
  );
  return makeLogErrorDecorator(createIdeiaController);
};
