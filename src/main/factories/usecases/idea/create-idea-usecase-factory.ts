import { CreateIdeaUsecase } from '@/data/usecases';
import { IdeaRepository } from '@/infra/db';

export const makeCreateIdeaUsecase = (): CreateIdeaUsecase => {
  const ideaRepository = new IdeaRepository();
  return new CreateIdeaUsecase(ideaRepository);
};
