import { UpdateUserUsecase } from '@/data/usecases';
import { UserRepository } from '@/infra/db';
import { makeBcryptAdapter } from '@/main/factories/gateways';

export const makeUpdateUserUseCase = (): UpdateUserUsecase => {
  const userRepository = new UserRepository();
  return new UpdateUserUsecase(
    makeBcryptAdapter(),
    makeBcryptAdapter(),
    userRepository,
    userRepository,
  );
};
