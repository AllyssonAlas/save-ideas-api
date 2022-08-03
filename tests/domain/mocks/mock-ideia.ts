import { CreateIdeia } from '@/domain/usecases';

export const mockCreateIdeiaParams = (): CreateIdeia.Params => ({
  userId: 'any_user_id',
  title: 'any_title_ideia',
  description: 'any_description_ideia',
  features: [
    {
      name: 'any_feature_name',
      description: 'any_feature_description',
      finished: false,
    },
  ],
});
