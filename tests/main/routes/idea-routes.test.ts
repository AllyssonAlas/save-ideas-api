import { CollectionReference } from 'firebase-admin/firestore';
import request from 'supertest';

import { FirestoreHelper } from '@/infra/db';

import app from '@/main/config/app';

import { mockCreateIdeaParams } from '@/tests/domain/mocks';
import { mockAcessToken } from '@/tests/main/mocks';

describe('Idea Routes', () => {
  let usersCollection: CollectionReference;
  let ideasCollection: CollectionReference;

  beforeAll(() => {
    FirestoreHelper.connect();
    ideasCollection = FirestoreHelper.getCollection('ideas');
    usersCollection = FirestoreHelper.getCollection('users');
  });

  afterEach(async () => {
    const users = await usersCollection.listDocuments();

    for (let index = 0; index < users.length; index++) {
      await users[index].delete();
    }
  });

  afterEach(async () => {
    const ideas = await ideasCollection.listDocuments();

    for (let index = 0; index < ideas.length; index++) {
      await ideas[index].delete();
    }
  });

  afterAll(async () => {
    await FirestoreHelper.disconnect();
  });

  describe('POST /idea', () => {
    test('Should return 200 on success', async () => {
      const accessToken = await mockAcessToken();

      await request(app)
        .post('/api/idea')
        .set('x-access-token', accessToken)
        .send({
          title: 'Great idea',
          description: 'A great idea made by great features',
        })
        .expect(200);
    });

    test('Should return 400 on invalid features', async () => {
      const accessToken = await mockAcessToken();

      await request(app)
        .post('/api/idea')
        .set('x-access-token', accessToken)
        .send({
          title: 'Great idea',
          description: 'A great idea made by great features',
          features: [
            {
              name: 'A great feature',
              description: 'A great feature for a great idea',
              finished: false,
            },
            {
              name: 'A not so great feature',
              description: 'A great feature for a great idea',
            },
          ],
        })
        .expect(400);
    });
  });

  describe('GET /ideas', () => {
    test('Should return 204 on empty ideas list', async () => {
      const accessToken = await mockAcessToken();

      await request(app).get('/api/ideas').set('x-access-token', accessToken).expect(204);
    });

    test('Should return 200 on success', async () => {
      const accessToken = await mockAcessToken();

      const usersSnapshot = await usersCollection.get();
      const users = FirestoreHelper.collectionMapper(usersSnapshot);
      const ideaData = { ownerId: users[0].id, ...mockCreateIdeaParams() };
      await ideasCollection.add(ideaData);

      await request(app).get('/api/ideas').set('x-access-token', accessToken).expect(200);
    });
  });

  describe('DELETE /idea', () => {
    test('Should return 204 on success', async () => {
      const accessToken = await mockAcessToken();

      const usersSnapshot = await usersCollection.get();
      const users = FirestoreHelper.collectionMapper(usersSnapshot);
      const ideaData = { ownerId: users[0].id, ...mockCreateIdeaParams() };
      await ideasCollection.doc('any_idea_id').set(ideaData);

      await request(app)
        .delete('/api/idea/any_idea_id')
        .set('x-access-token', accessToken)
        .expect(204);
    });

    test('Should return 403 on invalid id', async () => {
      const accessToken = await mockAcessToken();

      await request(app)
        .delete('/api/idea/invalid_idea_id')
        .set('x-access-token', accessToken)
        .expect(403);
    });
  });
});
