export interface User {
  id: string;
  email: string;
  password: string;
  token?: string;
}

export type IconProps = {
  width: string;
  height: string;
  color: string;
  size: string;
  rotate?: string;
  background?: string;
};

export interface IconDimensions {
  size?: string;
  width?: string;
  height?: string;
  hasBg?: boolean;
}

export type UserSubmitForm = {
  email: string;
  password: string;
  username?: string;
};

export interface Breed {
  id: string;
  name: string;
  description: string;
  origin: string;
  temperament: string;
  alt_names?: string;
  life_span?: string;
}

export interface Cat {
  breeds: Breed[];
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface CatDataState {
  breeds: {
    [key: string]: Breed;
  };
  randomBreed: { [key: string]: Breed };
  randomBreedId: number;
  randomCat: Cat[];
  loading?: boolean;
  error?: string | null | any;
}
