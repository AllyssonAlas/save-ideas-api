import request from 'supertest';

import { FirestoreHelper } from '@/infra/db';

import app from '@/main/config/app';

describe('SignUp Routes', () => {
  beforeAll(() => {
    FirestoreHelper.connect();
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

  test('Should return an user on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'John Doe',
        email: 'jhon_doe@mail.com',
        password: 'jhon_doe@123',
        passwordConfirmation: 'jhon_doe@123',
      })
      .expect(204);
  });
});
