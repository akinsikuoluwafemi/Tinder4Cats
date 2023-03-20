export interface UserDataState {
  user: User;
  token: string;
  loading: boolean;
  error: string | null | { message: ''; success: false };
}

export interface User {
  id: string;
  email: string;
  password: string;
  username: string;
}

export interface UserResponse {
  user?: User;
  token?: string;
  message: string;
  success: boolean;
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

export interface favoriteCatResponse {
  created_at: string;
  id: number;
  image: { id: string; url: string };
  image_id: string;
  sub_id: string;
  user_id: string;
}

export interface CatDataState {
  breeds: {
    [key: string]: Breed;
  };
  randomBreed: { [key: string]: Breed };
  allFavorites: favoriteCatResponse[][];
  randomBreedId: number;
  randomCat: Cat[];
  loading?: boolean;
  error?: string | null | any;
}
