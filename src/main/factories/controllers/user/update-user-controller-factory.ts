import { Controller } from '@/presentation/protocols';
import { UpdateUserController } from '@/presentation/controllers';
import { makeUpdateUserUsecase } from '@/main/factories/usecases';
import { makeUpdateUserValidation } from '@/main/factories/validations';
import { makeLogErrorDecorator } from '@/main/factories/decorators';

export const makeUpdateUserController = (): Controller => {
  const upateUserController = new UpdateUserController(
    makeUpdateUserValidation(),
    makeUpdateUserUsecase(),
  );
  return makeLogErrorDecorator(upateUserController);
};
