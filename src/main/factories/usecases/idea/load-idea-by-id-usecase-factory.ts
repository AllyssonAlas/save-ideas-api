import { LoadIdeaByIdUsecase } from '@/data/usecases';
import { makeIdeaRepository } from '@/main/factories/repositories';

export const makeLoadIdeaByIdUsecase = (): LoadIdeaByIdUsecase => {
  return new LoadIdeaByIdUsecase(makeIdeaRepository());
};
