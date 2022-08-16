import { Middleware } from '@/presentation/protocols';
import { ValidateIdeaIdMiddleware } from '@/presentation/middlewares';
import { makeLoadIdeaByIdUsecase } from '@/main/factories/usecases';

export const makeValidateIdeaIdMiddleware = (): Middleware => {
  return new ValidateIdeaIdMiddleware(makeLoadIdeaByIdUsecase());
};
