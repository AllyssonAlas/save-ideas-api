import { FirestoreHelper, IdeiaRepository } from '@/infra/db';
import { CollectionReference } from 'firebase-admin/firestore';

import { mockCreateIdeiaParams } from '@/tests/domain/mocks';

const makeSut = (): IdeiaRepository => {
  return new IdeiaRepository();
};

describe('IdeiaRepository', () => {
  let ideiasCollection: CollectionReference;

  beforeAll(() => {
    FirestoreHelper.connect();
    ideiasCollection = FirestoreHelper.getCollection('ideias');
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

  describe('create()', () => {
    test('Should return true on success', async () => {
      const sut = makeSut();

      const ideia = await sut.create({
        ownerId: 'any_user_id',
        title: 'any_title_ideia',
        description: 'any_description_ideia',
        features: [
          {
            name: 'any_feature_name',
            description: 'any_feature_description',
            finished: false,
          },
        ],
      });

      expect(ideia.id).toBeTruthy();
      expect(ideia.ownerId).toBe('any_user_id');
      expect(ideia.title).toBe('any_title_ideia');
      expect(ideia.description).toBe('any_description_ideia');
      expect(ideia.features).toHaveLength(1);
    });
  });

  describe('list()', () => {
    test('Should return an empty list of ideias on success', async () => {
      const sut = makeSut();

      const ideias = await sut.list({ userId: 'any_user_id' });

      expect(ideias).toHaveLength(0);
    });

    test('Should return a list of ideias on success', async () => {
      const sut = makeSut();
      const ideiaData = { ownerId: 'any_user_id', ...mockCreateIdeiaParams() };
      await ideiasCollection.add(ideiaData);
      await ideiasCollection.add(ideiaData);

      const ideias = await sut.list({ userId: 'any_user_id' });

      expect(ideias).toHaveLength(2);
      expect(ideias[0].id).toBeTruthy();
      expect(ideias[0].ownerId).toBe('any_user_id');
      expect(ideias[0].title).toBe('any_title_ideia');
      expect(ideias[0].description).toBe('any_description_ideia');
      expect(ideias[0].features).toHaveLength(1);
    });
  });

  describe('load()', () => {
    test('Should return an ideia on success', async () => {
      const sut = makeSut();

      await ideiasCollection.doc('any_id').set(mockCreateIdeiaParams());
      const ideia = await sut.load({ ideiaId: 'any_id' });

      expect(ideia).toBeTruthy();
      expect(ideia?.title).toBe('any_title_ideia');
      expect(ideia?.description).toBe('any_description_ideia');
    });
  });
});
