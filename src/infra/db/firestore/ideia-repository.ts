import { CreateIdeiaRepository } from '@/data/protocols/repositories';
import { FirestoreHelper } from '@/infra/db';

export class IdeiaRepository implements CreateIdeiaRepository {
  async create(params: CreateIdeiaRepository.Params): Promise<CreateIdeiaRepository.Result> {
    const ideiasCollection = FirestoreHelper.getCollection('ideias');
    const ideiaRef = await ideiasCollection.add(params);
    const ideia = await ideiaRef.get();
    return FirestoreHelper.documentMapper(ideia);
  }
}
