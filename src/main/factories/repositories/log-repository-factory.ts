import { LogRepository } from '@/infra/db';

export const makeLogRepository = (): LogRepository => new LogRepository();
