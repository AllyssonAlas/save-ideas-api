import { CreateUserRepository, LoadUserRepository } from '@/data/protocols/repositories';
import { FirestoreHelper } from '@/infra/db';

export class UserRepository implements CreateUserRepository, LoadUserRepository {
  async create(params: CreateUserRepository.Params): Promise<CreateUserRepository.Result> {
    const usersCollection = FirestoreHelper.getCollection('users');
    const result = await usersCollection.add(params);
    return !!result;
  }

  async load(params: LoadUserRepository.Params): Promise<LoadUserRepository.Result> {
    const usersCollection = FirestoreHelper.getCollection('users');
    const usersSnapshot = await usersCollection.where('email', '==', params.email).get();
    if (usersSnapshot.empty) return null;
    const users = FirestoreHelper.collectionMapper(usersSnapshot);
    return users[0];
  }
}
