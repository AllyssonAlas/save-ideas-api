import { UpdateUserUsecase } from '@/data/usecases';

import { mockUpdateUserParams } from '@/tests/domain/mocks';
import { LoadUserByIdRepositorySpy } from '@/tests/data/mocks';

describe('UpdateUserUsecase', () => {
  test('Should call LoadUserByIdRepository with correct value', async () => {
    const loadUserByIdRepositorySpy = new LoadUserByIdRepositorySpy();
    const sut = new UpdateUserUsecase(loadUserByIdRepositorySpy);

    await sut.perform(mockUpdateUserParams());

    expect(loadUserByIdRepositorySpy.params).toEqual({ id: 'any_id' });
    expect(loadUserByIdRepositorySpy.callsCount).toBe(1);
  });
});
