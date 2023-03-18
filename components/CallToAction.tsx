import {
  getRandomCat,
  selectCatBreed,
  selectRandomBreed,
  selectRandomBreedId,
  setRandomBreed,
  setRandomBreedId,
} from '@/slices/catDataSlice';
import { rand_breed } from '@/utils/randomBreed';
import { useEnvVars } from '@/utils/useEnvVars';
import { PayloadAction } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Back, Cancel, Favorite, SuperLike } from './Icons';

const ActionWrapper = styled.div`
  height: 150px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 40px;
`;

const CallToAction = () => {
  const { API_ENDPOINT, API_KEY } = useEnvVars();
  const dispatch = useDispatch();

  const randomBreedId = useSelector(selectRandomBreedId);
  const catBreed = useSelector(selectCatBreed);
  const randomBreed = useSelector(selectRandomBreed);

  const callCat = () => {
    const randomCatBreedId = rand_breed(catBreed);
    const breed_id: string = Object.values(catBreed[randomCatBreedId])[0].id;
    console.log(breed_id);
    dispatch(setRandomBreedId(randomCatBreedId));
    const randomCatBreed = catBreed[randomCatBreedId];
    catBreed && dispatch(setRandomBreed(randomCatBreed));

    dispatch(
      getRandomCat({
        endpoint: API_ENDPOINT,
        breed_id,
        api_key: API_KEY,
      }) as any,
    );
  };

  return (
    <ActionWrapper>
      <span onClick={callCat}>
        <Back />
      </span>
      <span>
        <Cancel />
      </span>
      <span>
        <SuperLike />
      </span>
      <span>
        <Favorite />
      </span>
    </ActionWrapper>
  );
};

export default CallToAction;
