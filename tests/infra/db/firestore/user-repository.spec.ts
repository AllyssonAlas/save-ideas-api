import { FirestoreHelper, UserRepository } from '@/infra/db';
import { CollectionReference } from 'firebase-admin/firestore';

import { mockCreateUserParams } from '@/tests/domain/mocks';

const makeSut = (): UserRepository => {
  return new UserRepository();
};

describe('UsersRepository', () => {
  let usersCollection: CollectionReference;

  beforeAll(() => {
    FirestoreHelper.connect();
    usersCollection = FirestoreHelper.getCollection('users');
  });

  afterEach(async () => {
    const userCollection = FirestoreHelper.getCollection('users');
    const users = await userCollection.listDocuments();

    for (let index = 0; index < users.length; index++) {
      await users[index].delete();
    }
  });

  afterAll(async () => {
    await FirestoreHelper.disconnect();
  });

  describe('create()', () => {
    test('Should return true on success', async () => {
      const sut = makeSut();

      const user = await sut.create({
        name: 'any_name',
        email: 'any_email@example.com',
        password: 'any_password',
      });

      expect(user).toBeTruthy();
    });
  });

  describe('loadByEmail()', () => {
    test('Should return an user if email is valid', async () => {
      const sut = makeSut();
      const createUserParams = mockCreateUserParams();

      await usersCollection.add(createUserParams);
      const user = await sut.loadByEmail({ email: createUserParams.email });

      expect(user).toBeTruthy();
      expect(user?.id).toBeTruthy();
      expect(user?.name).toBe(createUserParams.name);
      expect(user?.email).toBe(createUserParams.email);
    });

    test('Should return null if email is invalid', async () => {
      const sut = makeSut();

      const user = await sut.loadByEmail({ email: 'invalid_email@mail.com' });

      expect(user).toBeNull();
    });
  });

  describe('update()', () => {
    test('Should return an user update with the data received', async () => {
      const sut = makeSut();
      const createUserParams = mockCreateUserParams();
      await usersCollection.add(createUserParams);

      const user = await sut.loadByEmail({ email: createUserParams.email });
      await sut.update({
        id: user?.id || 'any_id',
        name: 'other_name',
        email: 'other_mail@mail.com',
        password: 'other_password',
        accessToken: 'any_token',
      });
      const updatedUser = await sut.loadByEmail({ email: 'other_mail@mail.com' });

      expect(updatedUser?.name).toBe('other_name');
      expect(updatedUser?.password).toBe('other_password');
      expect(updatedUser?.accessToken).toBe('any_token');
    });
  });

  describe('loadById()', () => {
    test('Should return an user if id is valid', async () => {
      const sut = makeSut();

      await usersCollection.doc('any_id').set({
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        accessToken: 'any_access_token',
      });
      const user = await sut.loadById({ id: 'any_id' });

      expect(user).toBeTruthy();
      expect(user?.name).toBe('any_name');
      expect(user?.email).toBe('any_email@email.com');
      expect(user?.password).toBe('any_password');
      expect(user?.accessToken).toBe('any_access_token');
    });
  });
});
