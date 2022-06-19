import { CreateUserRepository } from '@/data/protocols/repositories';
import { FirestoreHelper } from '@/infra/db';

export class UserRepository implements CreateUserRepository {
  async create(params: CreateUserRepository.Params): Promise<CreateUserRepository.Result> {
    const usersCollection = FirestoreHelper.getCollection('users');
    const result = await usersCollection.add(params);
    return !!result;
  }
}
