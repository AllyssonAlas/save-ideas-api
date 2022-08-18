import { FirestoreHelper, IdeaRepository } from '@/infra/db';
import { CollectionReference } from 'firebase-admin/firestore';

import { mockCreateIdeaParams } from '@/tests/domain/mocks';

const makeSut = (): IdeaRepository => {
  return new IdeaRepository();
};

describe('IdeaRepository', () => {
  let ideasCollection: CollectionReference;

  beforeAll(() => {
    FirestoreHelper.connect();
    ideasCollection = FirestoreHelper.getCollection('ideas');
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

  describe('create()', () => {
    test('Should return true on success', async () => {
      const sut = makeSut();

      const idea = await sut.create({
        ownerId: 'any_user_id',
        title: 'any_title_idea',
        description: 'any_description_idea',
        features: [
          {
            name: 'any_feature_name',
            description: 'any_feature_description',
            finished: false,
          },
        ],
      });

      expect(idea.id).toBeTruthy();
      expect(idea.ownerId).toBe('any_user_id');
      expect(idea.title).toBe('any_title_idea');
      expect(idea.description).toBe('any_description_idea');
      expect(idea.features).toHaveLength(1);
    });
  });

  describe('list()', () => {
    test('Should return an empty list of ideas on success', async () => {
      const sut = makeSut();

      const ideas = await sut.list({ userId: 'any_user_id' });

      expect(ideas).toHaveLength(0);
    });

    test('Should return a list of ideas on success', async () => {
      const sut = makeSut();
      const ideaData = { ownerId: 'any_user_id', ...mockCreateIdeaParams() };
      await ideasCollection.add(ideaData);
      await ideasCollection.add(ideaData);

      const ideas = await sut.list({ userId: 'any_user_id' });

      expect(ideas).toHaveLength(2);
      expect(ideas[0].id).toBeTruthy();
      expect(ideas[0].ownerId).toBe('any_user_id');
      expect(ideas[0].title).toBe('any_title_idea');
      expect(ideas[0].description).toBe('any_description_idea');
      expect(ideas[0].features).toHaveLength(1);
    });
  });

  describe('load()', () => {
    test('Should return an idea on success', async () => {
      const sut = makeSut();

      await ideasCollection.doc('any_id').set(mockCreateIdeaParams());
      const idea = await sut.load({ ideaId: 'any_id' });

      expect(idea).toBeTruthy();
      expect(idea?.title).toBe('any_title_idea');
      expect(idea?.description).toBe('any_description_idea');
    });

    test('Should return null if idea does not exists', async () => {
      const sut = makeSut();

      const idea = await sut.load({ ideaId: 'any_idea_id' });

      expect(idea).toBeNull();
    });
  });

  describe('deleteById()', () => {
    test('Should not find an idea with given id', async () => {
      const sut = makeSut();
      await ideasCollection.doc('any_idea_id').set(mockCreateIdeaParams());

      const docData = await ideasCollection.doc('any_idea_id').get();
      const ideaData = FirestoreHelper.documentMapper(docData);
      expect(ideaData).toBeTruthy();
      expect(ideaData.title).toBe('any_title_idea');
      expect(ideaData.description).toBe('any_description_idea');
      await sut.deleteById({ ideaId: 'any_idea_id' });
      const idea = await ideasCollection.doc('any_idea_id').get();

      expect(idea.exists).toBe(false);
    });
  });

  describe('UpdateIdea()', () => {
    test('Should not find an idea with given id', async () => {
      const sut = makeSut();
      await ideasCollection.doc('any_idea_id').set(mockCreateIdeaParams());

      let docData = await ideasCollection.doc('any_idea_id').get();
      const ideaData = FirestoreHelper.documentMapper(docData);
      expect(ideaData.title).toBe('any_title_idea');
      expect(ideaData.description).toBe('any_description_idea');
      expect(ideaData.features).toHaveLength(1);
      await sut.update({
        id: 'any_idea_id',
        title: 'other_title_idea',
        description: 'other_description_idea',
      });
      docData = await ideasCollection.doc('any_idea_id').get();
      const ideaDataUpdated = FirestoreHelper.documentMapper(docData);

      expect(ideaDataUpdated.title).toBe('other_title_idea');
      expect(ideaDataUpdated.description).toBe('other_description_idea');
      expect(ideaDataUpdated.features).toHaveLength(1);
    });
  });
});
