import { SignUpController } from '@/presentation/controllers';
import { makeSignUpUseCase } from '@/main/factories/usecases';
import { makeSignUpValidation } from '@/main/factories/validations';

export const makeSignUpController = (): SignUpController => {
  return new SignUpController(makeSignUpValidation(), makeSignUpUseCase());
};
