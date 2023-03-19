import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLayout } from '@/slices/layoutSlice';
import { selectCatLoading, selectRandomCat } from '@/slices/catDataSlice';
import { LoadingIndicator } from '@/utils/styles';

const CatWrapper = styled.figure`
  height: 500px;
  width: 100%;
  background: transparent;
  margin: 0 auto;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

const backAnimation = keyframes`
  0% {
    transform: translateX(-40%);
    opacity: 1;

  }
  50% {
    transform:  translate(-70%, -5%);;
    opacity: 1;

  }
  100% {
    transform: translate(-100%, -10%);
    opacity: 0;
  }

`;

const CatImg = styled.img<{ bg: string }>`
  flex: 0.9;
  background-image: url(${({ bg }) => bg});
  background-size: cover;
  background-position: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  // transform: translateX(-50%);
  // transform: translate3d(200%, -50%, 0) rotate(45deg);
  // animation: ${backAnimation} 1.5s ease-in-out forwards;
`;

const CatBio = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  flex: 0.1;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  color: #000;
  padding: 20px 10px;
`;

const CatCaption = styled.figcaption``;

const CatsName = styled.span`
  font-size: 30px;
  font-weight: 500;
  color: #4d4d4d;
`;

const CatsProf = styled.span`
  font-size: 14px;
  color: #4d4d4d;
`;
const CatProfile = () => {
  const newCat = useSelector(selectRandomCat);
  // console.log(newCat[0].url);
  const loading = useSelector(selectCatLoading);

  const dispatch = useDispatch();
  return (
    <CatWrapper onClick={() => dispatch(toggleLayout())}>
      {loading && <LoadingIndicator>Loading...</LoadingIndicator>}
      <CatImg bg={newCat[0]?.url} />

      <CatBio>
        <CatsName>{newCat[0]?.breeds[0].name}</CatsName>
        <CatsProf>Origin: {newCat[0]?.breeds[0].origin}</CatsProf>
      </CatBio>
    </CatWrapper>
  );
};

export default CatProfile;
