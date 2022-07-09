import { SignUpController } from '@/presentation/controllers';
import { makeSignUpUseCase } from '@/main/factories/usecases';
import { makeSignUpValidation } from '@/main/factories/validations';
import { Controller } from '@/presentation/protocols';
import { LogControllerDecorator } from '@/main/decorators/log';

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(makeSignUpValidation(), makeSignUpUseCase());
  return new LogControllerDecorator(signUpController);
};
