import { ListIdeiasUsecase } from '@/data/usecases';
import { IdeiaRepository } from '@/infra/db';

export const makeListIdeiasUsecase = (): ListIdeiasUsecase => {
  const ideiaRepository = new IdeiaRepository();
  return new ListIdeiasUsecase(ideiaRepository);
};
