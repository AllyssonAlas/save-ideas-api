import { CreateIdeiaRepository, ListIdeiasRepository } from '@/data/protocols/repositories';
import { FirestoreHelper } from '@/infra/db';

export class IdeiaRepository implements CreateIdeiaRepository, ListIdeiasRepository {
  async create(params: CreateIdeiaRepository.Params): Promise<CreateIdeiaRepository.Result> {
    const ideiasCollection = FirestoreHelper.getCollection('ideias');
    const ideiaRef = await ideiasCollection.add(params);
    const ideia = await ideiaRef.get();
    return FirestoreHelper.documentMapper(ideia);
  }

  async list(params: ListIdeiasRepository.Params): Promise<ListIdeiasRepository.Result> {
    const ideiasCollection = FirestoreHelper.getCollection('ideias');
    const ideiasSnapshot = await ideiasCollection.where('ownerId', '==', params.userId).get();
    const ideias = FirestoreHelper.collectionMapper(ideiasSnapshot);
    return ideias;
  }
}
