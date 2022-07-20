import { LoadUserByIdUsecase } from '@/data/usecases';
import { UserRepository } from '@/infra/db';

export const makeLoadUserByIdUseCase = (): LoadUserByIdUsecase => {
  const userRepository = new UserRepository();
  return new LoadUserByIdUsecase(userRepository);
};
