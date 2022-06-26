import { Router } from 'express';

import { adaptRoute } from '@/main/adapters';
import { makeSignUpController } from '@/main/factories/sign-up';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()));
};
