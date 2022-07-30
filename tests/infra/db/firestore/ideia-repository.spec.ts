import { FirestoreHelper, IdeiaRepository } from '@/infra/db';
import { CollectionReference } from 'firebase-admin/firestore';

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
      expect(ideia.title).toBe('any_title_ideia');
      expect(ideia.description).toBe('any_description_ideia');
      expect(ideia.features).toHaveLength(1);
    });
  });
});
