import { FirestoreHelper, UserRepository } from '@/infra/db';
import { CollectionReference } from 'firebase-admin/firestore';

import { mockSignUpParams, mockUpdateUserWithAdditionalValuesParams } from '@/tests/domain/mocks';

const makeSut = (): UserRepository => {
  return new UserRepository();
};

describe('UserRepository', () => {
  let usersCollection: CollectionReference;

  beforeAll(() => {
    FirestoreHelper.connect();
    usersCollection = FirestoreHelper.getCollection('users');
  });

  afterEach(async () => {
    const users = await usersCollection.listDocuments();

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

      const user = await sut.create(mockSignUpParams());

      expect(user).toBeTruthy();
    });
  });

  describe('loadByField()', () => {
    test('Should return an user if email is valid', async () => {
      const sut = makeSut();
      const createUserParams = mockSignUpParams();

      await usersCollection.add(createUserParams);
      const user = await sut.loadByField({ email: createUserParams.email });

      expect(user).toBeTruthy();
      expect(user?.id).toBeTruthy();
      expect(user?.name).toBe(createUserParams.name);
      expect(user?.email).toBe(createUserParams.email);
    });

    test('Should return null if email is invalid', async () => {
      const sut = makeSut();

      const user = await sut.loadByField({ email: 'invalid_email@mail.com' });

      expect(user).toBeNull();
    });
  });

  describe('update()', () => {
    test('Should return an user update with the data received', async () => {
      const sut = makeSut();
      await usersCollection.doc('any_id').set(mockSignUpParams());

      await sut.update(mockUpdateUserWithAdditionalValuesParams());

      const updatedUser = await sut.loadById({ id: 'any_id' });
      expect(updatedUser.name).toBe('other_name');
      expect(updatedUser.email).toBe('other_email@mail.com');
    });
  });

  describe('loadById()', () => {
    test('Should return an user if id is valid', async () => {
      const sut = makeSut();

      await usersCollection.doc('any_id').set(mockSignUpParams());
      const user = await sut.loadById({ id: 'any_id' });

      expect(user).toBeTruthy();
      expect(user.name).toBe('any_name');
      expect(user.email).toBe('any_email@mail.com');
    });
  });
});
