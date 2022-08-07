import {
  CreateUserRepository,
  LoadUserByFieldRepository,
  UpdateUserRepository,
  LoadUserByIdRepository,
} from '@/data/protocols/repositories';
import { FirestoreHelper } from '@/infra/db';

// eslint-disable-next-line prettier/prettier
export class UserRepository implements
    CreateUserRepository,
    LoadUserByFieldRepository,
    UpdateUserRepository,
    LoadUserByIdRepository
{
  async create(params: CreateUserRepository.Params): Promise<CreateUserRepository.Result> {
    const usersCollection = FirestoreHelper.getCollection('users');
    const result = await usersCollection.add(params);
    return !!result;
  }

  async loadByField(
    params: LoadUserByFieldRepository.Params,
  ): Promise<LoadUserByFieldRepository.Result> {
    const [field] = Object.keys(params);
    const [fieldValue] = Object.values(params);
    const usersCollection = FirestoreHelper.getCollection('users');
    const usersSnapshot = await usersCollection.where(field, '==', fieldValue).get();
    if (usersSnapshot.empty) return null;
    const users = FirestoreHelper.collectionMapper(usersSnapshot);
    return users[0];
  }

  async update(params: UpdateUserRepository.Params): Promise<void> {
    const { id, ...userData } = params;
    const usersCollection = FirestoreHelper.getCollection('users');
    const docRef = usersCollection.doc(id);
    await docRef.update(userData);
  }

  async loadById(params: LoadUserByIdRepository.Params): Promise<LoadUserByIdRepository.Result> {
    const usersCollection = FirestoreHelper.getCollection('users');
    const docData = await usersCollection.doc(params.id).get();
    return FirestoreHelper.documentMapper(docData);
  }
}
