import { SignUpUsecase } from '@/data/usecases';
import { UserRepository } from '@/infra/db';
import { BcryptAdapter } from '@/infra/gateways/bcrypt-adapter';
import { SignUpController } from '@/presentation/controllers';
import { EmailValidatorAdapter } from '@/presentation/utils';

export const makeSignUpController = (): SignUpController => {
  const emailValidator = new EmailValidatorAdapter();
  const salt = 12;
  const hasher = new BcryptAdapter(salt);
  const loadUserRepository = new UserRepository();
  const createUserRepository = new UserRepository();
  const signUp = new SignUpUsecase(hasher, loadUserRepository, createUserRepository);
  return new SignUpController(emailValidator, signUp);
};
