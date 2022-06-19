import { resolve } from 'path';
import { initializeApp, cert, App as FirebaseClient, deleteApp } from 'firebase-admin/app';
import { getFirestore, CollectionReference } from 'firebase-admin/firestore';

export const FirestoreHelper = {
  client: null as unknown as FirebaseClient,

  connect(): void {
    this.client = initializeApp({
      credential: cert(
        resolve(__dirname, '..', '..', '..', '..', 'certificates', 'firebase-certificate.json'),
      ),
    });
  },

  async disconnect(): Promise<void> {
    await deleteApp(this.client);
  },

  getCollection(name: string): CollectionReference {
    return getFirestore(this.client).collection(name);
  },
};
