import { LogErrorRepository } from '@/data/protocols/repositories';

export class LogErrorRepositorySpy implements LogErrorRepository {
  params?: LogErrorRepository.Params;

  async logError(params: LogErrorRepository.Params): Promise<void> {
    this.params = params;
    return Promise.resolve();
  }
}
