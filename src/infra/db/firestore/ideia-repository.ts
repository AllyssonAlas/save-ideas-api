import {
  CreateIdeiaRepository,
  ListIdeiasRepository,
  LoadIdeiaByIdRepository,
  DeleteIdeiaByIdRepository,
} from '@/data/protocols/repositories';
import { FirestoreHelper } from '@/infra/db';

// eslint-disable-next-line prettier/prettier
export class IdeiaRepository implements CreateIdeiaRepository, ListIdeiasRepository, LoadIdeiaByIdRepository, DeleteIdeiaByIdRepository {
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

  async load(params: LoadIdeiaByIdRepository.Params): Promise<LoadIdeiaByIdRepository.Result> {
    const ideiasCollection = FirestoreHelper.getCollection('ideias');
    const docData = await ideiasCollection.doc(params.ideiaId).get();
    return docData.exists ? FirestoreHelper.documentMapper(docData) : null;
  }

  async deleteById(params: DeleteIdeiaByIdRepository.Params): Promise<void> {
    const ideiasCollection = FirestoreHelper.getCollection('ideias');
    await ideiasCollection.doc(params.ideiaId).delete();
  }
}
