import { UpdateIdeaUsecase } from '@/data/usecases';
import { IdeaRepository } from '@/infra/db';

export const makeUpdateIdeaUsecase = (): UpdateIdeaUsecase => {
  const ideaRepository = new IdeaRepository();
  return new UpdateIdeaUsecase(ideaRepository);
};
