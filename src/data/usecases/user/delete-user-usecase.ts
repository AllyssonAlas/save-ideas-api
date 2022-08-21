import { DeleteUser } from '@/domain/usecases';
import {
  DeleteIdeasByOwnerIdRepository,
  DeleteUserRepository,
} from '@/data/protocols/repositories';

export class DeleteUserUsecase implements DeleteUser {
  constructor(
    private readonly deleteIdeasByOwnerIdRepository: DeleteIdeasByOwnerIdRepository,
    private readonly deleteUserRepository: DeleteUserRepository,
  ) {}

  async perform(params: DeleteUser.Params): Promise<DeleteUser.Result> {
    await this.deleteIdeasByOwnerIdRepository.deleteByOwnerId({ ownerId: params.id });
    await this.deleteUserRepository.delete(params);
  }
}
