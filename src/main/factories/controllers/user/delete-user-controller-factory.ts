import { Controller } from '@/presentation/protocols';
import { DeleteUserController } from '@/presentation/controllers';
import { makeDeleteUserUsecase } from '@/main/factories/usecases';
import { makeLogErrorDecorator } from '@/main/factories/decorators';

export const makeDeleteUserController = (): Controller => {
  const deleteUserController = new DeleteUserController(makeDeleteUserUsecase());
  return makeLogErrorDecorator(deleteUserController);
};
