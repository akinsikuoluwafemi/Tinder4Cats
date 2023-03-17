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
