import { UpdateUserUsecase } from '@/data/usecases';
import { UserRepository } from '@/infra/db';
import { makeBcryptAdapter } from '@/main/factories/gateways';

export const makeUpdateUserUsecase = (): UpdateUserUsecase => {
  const userRepository = new UserRepository();
  return new UpdateUserUsecase(
    userRepository,
    userRepository,
    makeBcryptAdapter(),
    makeBcryptAdapter(),
    userRepository,
  );
};
