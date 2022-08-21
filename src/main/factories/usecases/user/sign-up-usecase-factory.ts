import { SignUpUsecase } from '@/data/usecases';
import { makeUserRepository } from '@/main/factories/repositories';
import { makeBcryptAdapter } from '@/main/factories/gateways';

export const makeSignUpUseCase = (): SignUpUsecase => {
  return new SignUpUsecase(makeBcryptAdapter(), makeUserRepository(), makeUserRepository());
};
