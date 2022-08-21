import { UpdateUserUsecase } from '@/data/usecases';
import { makeUserRepository } from '@/main/factories/repositories';
import { makeBcryptAdapter } from '@/main/factories/gateways';

export const makeUpdateUserUsecase = (): UpdateUserUsecase => {
  return new UpdateUserUsecase(
    makeUserRepository(),
    makeUserRepository(),
    makeBcryptAdapter(),
    makeBcryptAdapter(),
    makeUserRepository(),
  );
};
