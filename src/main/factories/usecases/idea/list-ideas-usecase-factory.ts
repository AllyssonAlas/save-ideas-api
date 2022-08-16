import { ListIdeasUsecase } from '@/data/usecases';
import { IdeaRepository } from '@/infra/db';

export const makeListIdeasUsecase = (): ListIdeasUsecase => {
  const ideaRepository = new IdeaRepository();
  return new ListIdeasUsecase(ideaRepository);
};
