import { Controller } from '@/presentation/protocols';
import { SignUpController } from '@/presentation/controllers';
import { makeSignUpUseCase, makeAuthenticationUseCase } from '@/main/factories/usecases';
import { makeSignUpValidation } from '@/main/factories/validations';
import { makeLogErrorDecorator } from '@/main/factories/decorators';

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(
    makeSignUpValidation(),
    makeSignUpUseCase(),
    makeAuthenticationUseCase(),
  );
  return makeLogErrorDecorator(signUpController);
};
