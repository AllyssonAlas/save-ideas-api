import { Router } from 'express';

import { adaptRoute } from '@/main/adapters';
import { auth } from '@/main/middlewares';
import { makeCreateIdeiaController } from '@/main/factories/controllers';

export default (router: Router): void => {
  router.post('/ideia', auth, adaptRoute(makeCreateIdeiaController()));
};
