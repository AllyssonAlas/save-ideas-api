import { Router } from 'express';

import { adaptRoute } from '@/main/adapters';
import { auth, validateIdeaId } from '@/main/middlewares';
import {
  makeCreateIdeaController,
  makeListIdeasController,
  makeDeleteIdeaController,
  makeUpdateIdeaController,
} from '@/main/factories/controllers';

export default (router: Router): void => {
  router.post('/idea', auth, adaptRoute(makeCreateIdeaController()));
  router.get('/ideas', auth, adaptRoute(makeListIdeasController()));
  router.delete('/idea/:ideaId', auth, validateIdeaId, adaptRoute(makeDeleteIdeaController()));
  router.put('/idea/:ideaId', auth, validateIdeaId, adaptRoute(makeUpdateIdeaController()));
};
