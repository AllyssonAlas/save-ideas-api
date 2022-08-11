import { CreateIdeia, ListIdeias, LoadIdeiaById } from '@/domain/usecases';

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

export const mockListIdeiasParams = (): ListIdeias.Params => ({
  userId: 'any_user_id',
});

export const mockLoadIdeiaByIdParams = (): LoadIdeiaById.Params => ({
  ideiaId: 'any_ideia_id',
});
