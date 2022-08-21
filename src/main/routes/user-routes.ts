import { Router } from 'express';

import { adaptRoute } from '@/main/adapters';
import { auth } from '@/main/middlewares';
import {
  makeSignUpController,
  makeAuthenticationController,
  makeUpdateUserController,
  makeDeleteUserController,
} from '@/main/factories/controllers';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()));
  router.post('/login', adaptRoute(makeAuthenticationController()));
  router.put('/update-user', auth, adaptRoute(makeUpdateUserController()));
  router.put('/delete-user', auth, adaptRoute(makeDeleteUserController()));
};
