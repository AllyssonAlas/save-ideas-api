import { UpdateIdeaUsecase } from '@/data/usecases';
import { makeIdeaRepository } from '@/main/factories/repositories';

export const makeUpdateIdeaUsecase = (): UpdateIdeaUsecase => {
  return new UpdateIdeaUsecase(makeIdeaRepository());
};
