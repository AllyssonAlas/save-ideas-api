import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { FirestoreHelper } from '@/infra/db';

import env from '@/main/config/env';

export const mockAcessToken = async (): Promise<string> => {
  const password = await hash('jhon_doe@123', 12);
  const usersCollection = FirestoreHelper.getCollection('users');

  const user = await usersCollection.add({
    name: 'John Doe',
    email: 'jhon_doe@mail.com',
    password,
  });

  const accessToken = sign(user.id, env.jwtSecret);

  user.update({ accessToken });

  return accessToken;
};
