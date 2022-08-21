import { LoadUserByTokenUsecase } from '@/data/usecases';
import { makeUserRepository } from '@/main/factories/repositories';
import { makeJwtAdapter } from '@/main/factories/gateways';

export const makeLoadUserByTokenUseCase = (): LoadUserByTokenUsecase => {
  return new LoadUserByTokenUsecase(makeJwtAdapter(), makeUserRepository());
};
