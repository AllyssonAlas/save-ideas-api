type IdeiaFeatures = {
  name: string;
  description: string;
  finished: boolean;
};

export type Ideia = {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  features?: IdeiaFeatures[];
};
