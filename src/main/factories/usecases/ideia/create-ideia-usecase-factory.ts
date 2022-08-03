import { CreateIdeiaUsecase } from '@/data/usecases';
import { IdeiaRepository } from '@/infra/db';

export const makeCreateIdeiaUsecase = (): CreateIdeiaUsecase => {
  const ideiaRepository = new IdeiaRepository();
  return new CreateIdeiaUsecase(ideiaRepository);
};
