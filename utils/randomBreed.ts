import { Breed } from './../types/globalTypes';

export const rand_breed = (breeds: { [key: string]: Breed }) => {
  return Object.keys(breeds)[
    Math.floor(Math.random() * Object.keys(breeds).length)
  ];
};
