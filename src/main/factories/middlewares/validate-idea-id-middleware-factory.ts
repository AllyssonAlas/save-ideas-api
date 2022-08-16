import { Middleware } from '@/presentation/protocols';
import { ValidateIdeaIdMiddleware } from '@/presentation/middlewares';
import { makeLoadIdeaByIdUsecase } from '@/main/factories/usecases';

export const makeValidateIdeaByIdMiddleware = (): Middleware => {
  return new ValidateIdeaIdMiddleware(makeLoadIdeaByIdUsecase());
};
