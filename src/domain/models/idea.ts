type IdeaFeatures = {
  name: string;
  description: string;
  finished: boolean;
};

export type Idea = {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  features?: IdeaFeatures[];
};
