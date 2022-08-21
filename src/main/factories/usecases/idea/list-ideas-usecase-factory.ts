import { ListIdeasUsecase } from '@/data/usecases';
import { makeIdeaRepository } from '@/main/factories/repositories';

export const makeListIdeasUsecase = (): ListIdeasUsecase => {
  return new ListIdeasUsecase(makeIdeaRepository());
};
