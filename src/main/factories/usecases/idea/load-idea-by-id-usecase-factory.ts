import { LoadIdeaByIdUsecase } from '@/data/usecases';
import { IdeaRepository } from '@/infra/db';

export const makeLoadIdeaByIdUsecase = (): LoadIdeaByIdUsecase => {
  const ideaRepository = new IdeaRepository();
  return new LoadIdeaByIdUsecase(ideaRepository);
};
