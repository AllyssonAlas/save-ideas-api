import request from 'supertest';

import { FirestoreHelper } from '@/infra/db';

import app from '@/main/config/app';

import { mockAcessToken, mockIdea } from '@/tests/main/mocks';

describe('User Routes', () => {
  beforeAll(() => {
    FirestoreHelper.connect();
  });

  afterEach(async () => {
    const usersCollection = FirestoreHelper.getCollection('users');
    const users = await usersCollection.listDocuments();

    for (let index = 0; index < users.length; index++) {
      await users[index].delete();
    }
  });

  afterEach(async () => {
    const ideasCollection = FirestoreHelper.getCollection('ideas');
    const ideas = await ideasCollection.listDocuments();

    for (let index = 0; index < ideas.length; index++) {
      await ideas[index].delete();
    }
  });

  afterAll(async () => {
    await FirestoreHelper.disconnect();
  });

  describe('POST /signup', () => {
    test('Should return an user on success', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'John Doe',
          email: 'jhon_doe@mail.com',
          password: 'jhon_doe@123',
          passwordConfirmation: 'jhon_doe@123',
        })
        .expect(200);
    });
  });

  describe('POST /login', () => {
    test('Should return 200 on success', async () => {
      await mockAcessToken();

      await request(app)
        .post('/api/login')
        .send({
          email: 'jhon_doe@mail.com',
          password: 'jhon_doe@123',
        })
        .expect(200);
    });

    test('Should return 401 on failure', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'jhon_doe@mail.com',
          password: 'jhon_doe@123',
        })
        .expect(401);
    });
  });

  describe('PUT /update-user', () => {
    test('Should return 204 on success', async () => {
      const accessToken = await mockAcessToken();

      await request(app)
        .put('/api/update-user')
        .set('x-access-token', accessToken)
        .send({
          name: 'Johnny Doe',
          email: 'jhon_doe@mail.com',
        })
        .expect(204);
    });
  });

  describe('DELETE /delete-user', () => {
    test('Should return 204 on success', async () => {
      const accessToken = await mockAcessToken();

      await mockIdea();
      await mockIdea();

      await request(app).put('/api/delete-user').set('x-access-token', accessToken).expect(204);
    });
  });
});
