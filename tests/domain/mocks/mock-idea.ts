import { CreateIdea, ListIdeas, LoadIdeaById, UpdateIdea } from '@/domain/usecases';

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

export const mockUpdateIdeaParams = (): UpdateIdea.Params => ({
  id: 'any_idea_id',
  title: 'other_title_idea',
  description: 'other_description_idea',
});
