import { CreateIdeaUsecase } from '@/data/usecases';
import { makeIdeaRepository } from '@/main/factories/repositories';

export const makeCreateIdeaUsecase = (): CreateIdeaUsecase => {
  return new CreateIdeaUsecase(makeIdeaRepository());
};
