import { LoadUserUsecase } from '@/data/usecases';
import { UserRepository } from '@/infra/db';

export const makeLoadUserUseCase = (): LoadUserUsecase => {
  const userRepository = new UserRepository();
  return new LoadUserUsecase(userRepository);
};
