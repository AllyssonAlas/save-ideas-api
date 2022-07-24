import { Middleware } from '@/presentation/protocols';
import { AuthMiddleware } from '@/presentation/middlewares';
import { makeLoadUserByTokenUseCase } from '@/main/factories/usecases';

export const makeAuthMiddleware = (): Middleware => {
  return new AuthMiddleware(makeLoadUserByTokenUseCase());
};
