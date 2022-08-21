import { AuthenticationUsecase } from '@/data/usecases';
import { makeUserRepository } from '@/main/factories/repositories';
import { makeBcryptAdapter, makeJwtAdapter } from '@/main/factories/gateways';

export const makeAuthenticationUseCase = (): AuthenticationUsecase => {
  return new AuthenticationUsecase(
    makeUserRepository(),
    makeBcryptAdapter(),
    makeJwtAdapter(),
    makeUserRepository(),
  );
};
