import { SignUpController } from '@/presentation/controllers';
import { EmailValidatorAdapter } from '@/presentation/utils';
import { makeSignUpUseCase } from '@/main/factories/usecases';
import { makeSignUpValidation } from '@/main/factories/validations';

export const makeSignUpController = (): SignUpController => {
  const emailValidator = new EmailValidatorAdapter();
  return new SignUpController(emailValidator, makeSignUpUseCase(), makeSignUpValidation());
};
