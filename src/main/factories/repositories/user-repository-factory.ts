import { UserRepository } from '@/infra/db';

export const makeUserRepository = (): UserRepository => new UserRepository();
