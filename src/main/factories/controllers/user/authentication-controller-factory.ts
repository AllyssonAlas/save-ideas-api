import { Controller } from '@/presentation/protocols';
import { AuthenticationController } from '@/presentation/controllers';
import { makeAuthenticationUseCase } from '@/main/factories/usecases';
import { makeAuthenticationValidation } from '@/main/factories/validations';
import { makeLogErrorDecorator } from '@/main/factories/decorators';

export const makeAuthenticationController = (): Controller => {
  const authenticationController = new AuthenticationController(
    makeAuthenticationValidation(),
    makeAuthenticationUseCase(),
  );
  return makeLogErrorDecorator(authenticationController);
};
