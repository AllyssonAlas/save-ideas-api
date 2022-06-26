import request from 'supertest';

import app from '@/main/config/app';

describe('SingUp Routes', () => {
  test('Should return an user on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'John Doe',
        email: 'jhon_doe@mail.com',
        password: 'jhon_doe@123',
        passwordConfirmation: 'jhon_doe@123',
      })
      .expect(200);
  });
});
