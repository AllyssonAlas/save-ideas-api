import { Router } from 'express';

import { adaptRoute } from '@/main/adapters';
import { auth } from '@/main/middlewares';
import { makeCreateIdeiaController, makeListIdeiasController } from '@/main/factories/controllers';

export default (router: Router): void => {
  router.post('/ideia', auth, adaptRoute(makeCreateIdeiaController()));
  router.get('/ideias', auth, adaptRoute(makeListIdeiasController()));
};
