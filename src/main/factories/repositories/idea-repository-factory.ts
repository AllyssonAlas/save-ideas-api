import { IdeaRepository } from '@/infra/db';

export const makeIdeaRepository = (): IdeaRepository => new IdeaRepository();
