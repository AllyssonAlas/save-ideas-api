import { SignUpUsecase } from '@/data/usecases';
import { UserRepository } from '@/infra/db';
import { makeHasher } from '@/main/factories/gateways';

export const makeSignUpUseCase = (): SignUpUsecase => {
  const loadUserRepository = new UserRepository();
  const createUserRepository = new UserRepository();
  return new SignUpUsecase(makeHasher(), loadUserRepository, createUserRepository);
};
