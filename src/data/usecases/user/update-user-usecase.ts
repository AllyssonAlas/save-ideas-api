import { UpdateUser } from '@/domain/usecases';
import { LoadUserByIdRepository } from '@/data/protocols/repositories';

export class UpdateUserUsecase implements UpdateUser {
  constructor(private readonly loadUserByIdRepository: LoadUserByIdRepository) {}

  async perform(params: UpdateUser.Params): Promise<any> {
    await this.loadUserByIdRepository.loadById({ id: params.userId });
  }
}
