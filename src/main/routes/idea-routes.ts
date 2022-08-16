import { Router } from 'express';

import { adaptRoute } from '@/main/adapters';
import { auth } from '@/main/middlewares';
import { makeCreateIdeaController, makeListIdeasController } from '@/main/factories/controllers';

export default (router: Router): void => {
  router.post('/idea', auth, adaptRoute(makeCreateIdeaController()));
  router.get('/ideas', auth, adaptRoute(makeListIdeasController()));
};
