import { AuthenticationUsecase } from '@/data/usecases';
import { UserRepository } from '@/infra/db';
import { makeBcryptAdapter, makeJwtAdapter } from '@/main/factories/gateways';

export const makeAuthenticationUseCase = (): AuthenticationUsecase => {
  const userRepository = new UserRepository();
  return new AuthenticationUsecase(
    userRepository,
    makeBcryptAdapter(),
    makeJwtAdapter(),
    userRepository,
  );
};
