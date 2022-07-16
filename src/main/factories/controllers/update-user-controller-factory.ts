import { Controller } from '@/presentation/protocols';
import { UpdateUserController } from '@/presentation/controllers';
import { makeLoadUserUseCase, makeUpdateUserUseCase } from '@/main/factories/usecases';
import { makeUpdateUserValidation } from '@/main/factories/validations';
import { makeLogErrorDecorator } from '@/main/factories/decorators';

export const makeUpdateUserController = (): Controller => {
  const updateUserController = new UpdateUserController(
    makeUpdateUserValidation(),
    makeLoadUserUseCase(),
    makeUpdateUserUseCase(),
  );

  return makeLogErrorDecorator(updateUserController);
};
