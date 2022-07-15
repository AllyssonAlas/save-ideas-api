import { hash } from 'bcrypt';
import request from 'supertest';

import { FirestoreHelper } from '@/infra/db';

import app from '@/main/config/app';

describe('User Routes', () => {
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

  describe('/signup', () => {
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

  describe('/login', () => {
    test('Should return 200 on success', async () => {
      const password = await hash('jhon_doe@123', 12);
      const usersCollection = FirestoreHelper.getCollection('users');

      usersCollection.add({
        name: 'John Doe',
        email: 'jhon_doe@mail.com',
        password,
      });

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
});
