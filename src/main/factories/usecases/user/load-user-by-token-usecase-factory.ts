import { LoadUserByTokenUsecase } from '@/data/usecases';
import { UserRepository } from '@/infra/db';
import { makeJwtAdapter } from '@/main/factories/gateways';

export const makeLoadUserByTokenUseCase = (): LoadUserByTokenUsecase => {
  const userRepository = new UserRepository();
  return new LoadUserByTokenUsecase(makeJwtAdapter(), userRepository);
};
