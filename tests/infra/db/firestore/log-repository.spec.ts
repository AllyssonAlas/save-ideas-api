import { CollectionReference } from 'firebase-admin/firestore';
import { FirestoreHelper, LogRepository } from '@/infra/db';

describe('LogRepository', () => {
  let errorsCollection: CollectionReference;

  beforeAll(() => {
    FirestoreHelper.connect();
    errorsCollection = FirestoreHelper.getCollection('errors');
  });

  afterEach(async () => {
    errorsCollection = FirestoreHelper.getCollection('errors');
    const errors = await errorsCollection.listDocuments();

    for (let index = 0; index < errors.length; index++) {
      await errors[index].delete();
    }
  });

  afterAll(async () => {
    await FirestoreHelper.disconnect();
  });

  test('Should create an error log on success', async () => {
    const sut = new LogRepository();

    await sut.log({ stack: 'any_error' });
    const errorsSnapshot = await errorsCollection.get();
    const errors = FirestoreHelper.collectionMapper(errorsSnapshot);

    expect(errors).toHaveLength(1);
  });
});
