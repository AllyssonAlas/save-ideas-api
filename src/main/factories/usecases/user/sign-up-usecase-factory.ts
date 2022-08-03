import { SignUpUsecase } from '@/data/usecases';
import { UserRepository } from '@/infra/db';
import { makeBcryptAdapter } from '@/main/factories/gateways';

export const makeSignUpUseCase = (): SignUpUsecase => {
  const userRepository = new UserRepository();
  return new SignUpUsecase(makeBcryptAdapter(), userRepository, userRepository);
};
