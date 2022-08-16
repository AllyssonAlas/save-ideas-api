import {
  CreateIdeaRepository,
  ListIdeasRepository,
  LoadIdeaByIdRepository,
  DeleteIdeaByIdRepository,
} from '@/data/protocols/repositories';
import { FirestoreHelper } from '@/infra/db';

// eslint-disable-next-line prettier/prettier
export class IdeaRepository implements CreateIdeaRepository, ListIdeasRepository, LoadIdeaByIdRepository, DeleteIdeaByIdRepository {
  async create(params: CreateIdeaRepository.Params): Promise<CreateIdeaRepository.Result> {
    const ideasCollection = FirestoreHelper.getCollection('ideas');
    const ideaRef = await ideasCollection.add(params);
    const idea = await ideaRef.get();
    return FirestoreHelper.documentMapper(idea);
  }

  async list(params: ListIdeasRepository.Params): Promise<ListIdeasRepository.Result> {
    const ideasCollection = FirestoreHelper.getCollection('ideas');
    const ideasSnapshot = await ideasCollection.where('ownerId', '==', params.userId).get();
    const ideas = FirestoreHelper.collectionMapper(ideasSnapshot);
    return ideas;
  }

  async load(params: LoadIdeaByIdRepository.Params): Promise<LoadIdeaByIdRepository.Result> {
    const ideasCollection = FirestoreHelper.getCollection('ideas');
    const docData = await ideasCollection.doc(params.ideaId).get();
    return docData.exists ? FirestoreHelper.documentMapper(docData) : null;
  }

  async deleteById(params: DeleteIdeaByIdRepository.Params): Promise<void> {
    const ideasCollection = FirestoreHelper.getCollection('ideas');
    await ideasCollection.doc(params.ideaId).delete();
  }
}
