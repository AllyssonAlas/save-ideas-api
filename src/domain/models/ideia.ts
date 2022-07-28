type IdeiaFeatures = {
  name: string;
  description: string;
  finished: boolean;
};

export type Ideia = {
  id: string;
  title: string;
  description: string;
  features?: IdeiaFeatures[];
};
