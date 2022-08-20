import { DeleteIdeaByIdUsecase } from '@/data/usecases';
import { makeIdeaRepository } from '@/main/factories/repositories';

export const makeDeleteIdeaByIdUsecase = (): DeleteIdeaByIdUsecase => {
  return new DeleteIdeaByIdUsecase(makeIdeaRepository());
};
