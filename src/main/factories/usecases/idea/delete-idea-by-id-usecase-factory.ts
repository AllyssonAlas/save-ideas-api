import { DeleteIdeaByIdUsecase } from '@/data/usecases';
import { IdeaRepository } from '@/infra/db';

export const makeDeleteIdeaByIdUsecase = (): DeleteIdeaByIdUsecase => {
  const ideaRepository = new IdeaRepository();
  return new DeleteIdeaByIdUsecase(ideaRepository);
};
