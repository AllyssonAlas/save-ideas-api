import { ListIdeias } from '@/domain/usecases';
import { ListIdeiasRepository } from '@/data/protocols/repositories';

export class ListIdeiasUsecase implements ListIdeias {
  constructor(private readonly listIdeiasRepository: ListIdeiasRepository) {}

  async perform(params: ListIdeias.Params): Promise<any> {
    await this.listIdeiasRepository.list(params);
  }
}
