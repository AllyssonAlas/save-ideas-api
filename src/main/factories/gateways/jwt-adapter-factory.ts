import { JwtAdapter } from '@/infra/gateways';
import env from '@/main/config/env';

export const makeJwtAdapter = (): JwtAdapter => {
  return new JwtAdapter(env.jwtSecret);
};
