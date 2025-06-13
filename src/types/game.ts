export type Game = {
  name: string;
  code: string;
  description: string;
  free: boolean;
  charged: boolean;
  subStudioProvider: string;
  image: {
    url: string;
  };
  category: string;
  device: string;
};

export type Provider = {
  name: string;
  games?: Game[];
};