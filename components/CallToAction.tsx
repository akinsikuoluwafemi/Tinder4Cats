import useCats from '@/hooks/useCats';
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
  // const { API_ENDPOINT, API_KEY } = useEnvVars();
  const { callCat } = useCats();
  // const dispatch = useDispatch();

  // const randomBreedId = useSelector(selectRandomBreedId);
  // const catBreed = useSelector(selectCatBreed);
  // const randomBreed = useSelector(selectRandomBreed);

  return (
    <ActionWrapper>
      <span onClick={callCat}>
        <Back />
      </span>
      <span onClick={callCat}>
        <Cancel />
      </span>
      <span onClick={callCat}>
        <SuperLike />
      </span>
      <span>
        <Favorite />
      </span>
    </ActionWrapper>
  );
};

export default CallToAction;
