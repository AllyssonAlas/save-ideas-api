import { FirestoreHelper } from '@/infra/db';

import { mockCreateIdeaParams } from '@/tests/domain/mocks';

export const mockIdea = async (): Promise<string> => {
  const ideasCollection = FirestoreHelper.getCollection('ideas');
  const usersCollection = FirestoreHelper.getCollection('users');
  const usersSnapshot = await usersCollection.get();
  const users = FirestoreHelper.collectionMapper(usersSnapshot);
  const ideaData = await ideasCollection.add({ ownerId: users[0].id, ...mockCreateIdeaParams() });
  return ideaData.id;
};
