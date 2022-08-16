import { adaptMiddleware } from '@/main/adapters';
import { makeValidateIdeaIdMiddleware } from '@/main/factories/middlewares';

export const validateIdeaId = adaptMiddleware(makeValidateIdeaIdMiddleware());
