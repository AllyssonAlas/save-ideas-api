import { BcryptAdapter } from '@/infra/gateways';

export const makeHasher = (): BcryptAdapter => {
  const salt = 12;
  return new BcryptAdapter(salt);
};
