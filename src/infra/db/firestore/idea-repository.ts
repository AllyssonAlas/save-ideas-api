import {
  CreateIdeaRepository,
  ListIdeasRepository,
  LoadIdeaByIdRepository,
  DeleteIdeaByIdRepository,
  UpdateIdeaRepository,
} from '@/data/protocols/repositories';
import { FirestoreHelper } from '@/infra/db';

// eslint-disable-next-line prettier/prettier
export class IdeaRepository implements
    CreateIdeaRepository,
    ListIdeasRepository,
    LoadIdeaByIdRepository,
    DeleteIdeaByIdRepository,
    UpdateIdeaRepository
{
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

  async deleteById(
    params: DeleteIdeaByIdRepository.Params,
  ): Promise<DeleteIdeaByIdRepository.Result> {
    const ideasCollection = FirestoreHelper.getCollection('ideas');
    await ideasCollection.doc(params.ideaId).delete();
  }

  async update(params: UpdateIdeaRepository.Params): Promise<UpdateIdeaRepository.Result> {
    const { id, ...ideaData } = params;
    const ideasCollection = FirestoreHelper.getCollection('ideas');
    await ideasCollection.doc(params.id).update(ideaData);
  }
}
