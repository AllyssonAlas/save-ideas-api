import { FirestoreHelper, UserRepository } from '@/infra/db';

describe('UsersRepository', () => {
  beforeAll(() => {
    FirestoreHelper.connect();
  });

  afterAll(async () => {
    await FirestoreHelper.disconnect();
  });

  describe('add()', () => {
    test('Should return an user name and email on success', async () => {
      const sut = new UserRepository();
      const user = await sut.create({
        name: 'any_name',
        email: 'any_email@example.com',
        password: 'any_password',
      });

      expect(user).toBeTruthy();
    });
  });
});
