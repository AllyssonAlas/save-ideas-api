import { LoadUserUsecase } from '@/data/usecases';

import { LoadUserByIdRepositorySpy } from '@/tests/data/mocks';

describe('LoadUserUsecase', () => {
  test('Should call LoadUserByIdRepository with correct value', async () => {
    const loadUserByIdRepositorySpy = new LoadUserByIdRepositorySpy();
    const sut = new LoadUserUsecase(loadUserByIdRepositorySpy);

    await sut.perform({ id: 'any_id' });

    expect(loadUserByIdRepositorySpy.params).toEqual({ id: 'any_id' });
    expect(loadUserByIdRepositorySpy.callsCount).toBe(1);
  });
});
