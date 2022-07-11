import { Authentication } from '@/domain/usecases';
import { LoadUserRepository } from '@/data/protocols/repositories';

export class AuthenticationUsecase {
  constructor(private readonly loadUserRepository: LoadUserRepository) {}

  async perform(params: Authentication.Params): Promise<any> {
    const userData = await this.loadUserRepository.load({ email: params.email });
    if (!userData) {
      return null;
    }
  }
}
