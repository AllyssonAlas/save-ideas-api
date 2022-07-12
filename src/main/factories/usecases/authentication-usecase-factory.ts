import { AuthenticationUsecase } from '@/data/usecases';
import { UserRepository } from '@/infra/db';
import { makeHasher, makeJwtAdapter } from '@/main/factories/gateways';

export const makeAuthenticationUseCase = (): AuthenticationUsecase => {
  const userRepository = new UserRepository();
  return new AuthenticationUsecase(userRepository, makeHasher(), makeJwtAdapter(), userRepository);
};
