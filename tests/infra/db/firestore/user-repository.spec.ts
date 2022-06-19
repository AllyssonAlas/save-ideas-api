import { FirestoreHelper, UserRepository } from '@/infra/db';

const makeSut = (): UserRepository => {
  return new UserRepository();
};

describe('UsersRepository', () => {
  beforeAll(() => {
    FirestoreHelper.connect();
  });

  afterAll(async () => {
    await FirestoreHelper.disconnect();
  });

  describe('add()', () => {
    test('Should return an user name and email on success', async () => {
      const sut = makeSut();

      const user = await sut.create({
        name: 'any_name',
        email: 'any_email@example.com',
        password: 'any_password',
      });

      expect(user).toBeTruthy();
    });
  });
});
