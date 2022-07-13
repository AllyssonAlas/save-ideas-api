import {
  CreateUserRepository,
  LoadUserByEmailRepository,
  UpdateUserRepository,
} from '@/data/protocols/repositories';
import { FirestoreHelper } from '@/infra/db';

// eslint-disable-next-line prettier/prettier
export class UserRepository implements CreateUserRepository, LoadUserByEmailRepository, UpdateUserRepository {
  async create(params: CreateUserRepository.Params): Promise<CreateUserRepository.Result> {
    const usersCollection = FirestoreHelper.getCollection('users');
    const result = await usersCollection.add(params);
    return !!result;
  }

  async load(params: LoadUserByEmailRepository.Params): Promise<LoadUserByEmailRepository.Result> {
    const usersCollection = FirestoreHelper.getCollection('users');
    const usersSnapshot = await usersCollection.where('email', '==', params.email).get();
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
}
