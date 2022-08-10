import { CollectionReference } from 'firebase-admin/firestore';
import request from 'supertest';

import { FirestoreHelper } from '@/infra/db';

import app from '@/main/config/app';

import { mockAcessToken } from '@/tests/main/mocks';

describe('Ideia Routes', () => {
  let ideiasCollection: CollectionReference;

  beforeAll(() => {
    FirestoreHelper.connect();
    ideiasCollection = FirestoreHelper.getCollection('ideias');
  });

  afterEach(async () => {
    const userCollection = FirestoreHelper.getCollection('users');
    const users = await userCollection.listDocuments();

    for (let index = 0; index < users.length; index++) {
      await users[index].delete();
    }
  });

  afterEach(async () => {
    const ideias = await ideiasCollection.listDocuments();

    for (let index = 0; index < ideias.length; index++) {
      await ideias[index].delete();
    }
  });

  afterAll(async () => {
    await FirestoreHelper.disconnect();
  });

  describe('/ideia', () => {
    test('Should return 200 on success', async () => {
      const accessToken = await mockAcessToken();

      await request(app)
        .post('/api/ideia')
        .set('x-access-token', accessToken)
        .send({
          title: 'Great ideia',
          description: 'A great ideia made by great features',
        })
        .expect(200);
    });

    test('Should return 400 on invalid features', async () => {
      const accessToken = await mockAcessToken();

      await request(app)
        .post('/api/ideia')
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
            },
          ],
        })
        .expect(400);
    });
  });

  describe('/ideias', () => {
    test('Should return 204 on empty ideias list', async () => {
      const accessToken = await mockAcessToken();

      await request(app).get('/api/ideias').set('x-access-token', accessToken).expect(204);
    });
  });
});
