import { CreateIdea, ListIdeas, LoadIdeaById } from '@/domain/usecases';

export const mockCreateIdeaParams = (): CreateIdea.Params => ({
  userId: 'any_user_id',
  title: 'any_title_idea',
  description: 'any_description_idea',
  features: [
    {
      name: 'any_feature_name',
      description: 'any_feature_description',
      finished: false,
    },
  ],
});

export const mockListIdeasParams = (): ListIdeas.Params => ({
  userId: 'any_user_id',
});

export const mockLoadIdeaByIdParams = (): LoadIdeaById.Params => ({
  ideaId: 'any_idea_id',
});
