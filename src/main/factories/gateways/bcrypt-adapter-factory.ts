import { BcryptAdapter } from '@/infra/gateways';

export const makeBcryptAdapter = (): BcryptAdapter => {
  const salt = 12;
  return new BcryptAdapter(salt);
};
