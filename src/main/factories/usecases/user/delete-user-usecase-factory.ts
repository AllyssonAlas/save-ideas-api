import { DeleteUserUsecase } from '@/data/usecases';
import { makeIdeaRepository, makeUserRepository } from '@/main/factories/repositories';

export const makeDeleteUserUsecase = (): DeleteUserUsecase => {
  return new DeleteUserUsecase(makeIdeaRepository(), makeUserRepository());
};
