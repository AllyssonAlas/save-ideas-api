import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import request from 'supertest';

import { FirestoreHelper } from '@/infra/db';

import app from '@/main/config/app';
import env from '@/main/config/env';

const mockAcessToken = async () => {
  const password = await hash('jhon_doe@123', 12);
  const usersCollection = FirestoreHelper.getCollection('users');

  const user = await usersCollection.add({
    name: 'John Doe',
    email: 'jhon_doe@mail.com',
    password,
  });

  const accessToken = sign(user.id, env.jwtSecret);

  user.update({ accessToken });

  return { id: user.id, accessToken };
};

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

  afterEach(async () => {
    const ideiaCollection = FirestoreHelper.getCollection('ideias');
    const ideias = await ideiaCollection.listDocuments();

    for (let index = 0; index < ideias.length; index++) {
      await ideias[index].delete();
    }
  });

  afterAll(async () => {
    await FirestoreHelper.disconnect();
  });

  describe('/:userId/ideia', () => {
    test('Should return 200 on success', async () => {
      const { id, accessToken } = await mockAcessToken();

      await request(app)
        .put(`/api/${id}/ideia`)
        .set('x-access-token', accessToken)
        .send({
          title: 'Great ideia',
          description: 'A great ideia made by great features',
        })
        .expect(200);
    });

    test('Should return 400 on invalid features', async () => {
      const { id, accessToken } = await mockAcessToken();

      await request(app)
        .put(`/api/${id}/ideia`)
        .set('x-access-token', accessToken)
        .send({
          title: 'Great ideia',
          description: 'A great ideia made by great features',
          features: [
            {
              name: 'A great feature',
              description: 'A great feature for a great ideia',
              finished: false,
            },
            {
              name: 'A not so great feature',
              description: 'A great feature for a great ideia',
              // finished: false,
            },
          ],
        })
        .expect(400);
    });
  });
});
