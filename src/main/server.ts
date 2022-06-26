import 'module-alias/register';

import { FirestoreHelper } from '@/infra/db';
import env from '@/main/config/env';

Promise.resolve(FirestoreHelper.connect())
  .then(async () => {
    const app = (await import('@/main/config/app')).default;
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`));
  })
  .catch(console.error);
