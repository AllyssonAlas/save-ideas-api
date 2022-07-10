import { LogErrorRepository } from '@/data/protocols/repositories';
import { FirestoreHelper } from '@/infra/db';

export class LogRepository implements LogErrorRepository {
  async log(params: LogErrorRepository.Params): Promise<void> {
    const errorCollection = FirestoreHelper.getCollection('errors');
    await errorCollection.add({ stack: params.stack, date: new Date() });
  }
}
