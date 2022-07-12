import { JwtAdapter } from '@/infra/gateways';

export const makeJwtAdapter = (): JwtAdapter => {
  const secret = 'secret';
  return new JwtAdapter(secret);
};
