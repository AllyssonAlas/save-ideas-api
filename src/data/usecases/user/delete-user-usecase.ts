import { DeleteUser } from '@/domain/usecases';
import { DeleteIdeasByOwnerIdRepository } from '@/data/protocols/repositories';

export class DeleteUserUsecase implements DeleteUser {
  constructor(private readonly deleteIdeasByOwnerIdRepository: DeleteIdeasByOwnerIdRepository) {}

  async perform(params: DeleteUser.Params): Promise<DeleteUser.Result> {
    await this.deleteIdeasByOwnerIdRepository.deleteByOwnerId({ ownerId: params.id });
  }
}
