import { toggleLayout } from '@/slices/layoutSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Cancel, Favorite, SuperLike } from './Icons';
import {
  selectRandomBreedId,
  selectRandomBreed,
  selectCatBreed,
  selectRandomCat,
} from '@/slices/catDataSlice';

const CatDetailWrapper = styled.section`
  background: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const DetailPhoto = styled.div<{ bg: string }>`
  background-image: url(${({ bg }) => bg});
  background-size: cover;
  background-position: center;
  height: 450px;
  width: 100%;
  flex: 0.7;
  cursor: pointer;
`;

const DetailBio = styled.div`
  padding: 20px 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  border-bottom: 1px solid #e0e0e0;
  flex: 0.1;

  span:first-child {
    font-weight: 500;
    font-size: 25px;
    color: #222;
  }
  span:nth-child(2) {
    font-size: 17px;
    font-weight: 400;
    flex-wrap: wrap;

    color: #222;
  }
  span:nth-child(3) {
    font-weight: 400;

    font-size: 17px;
    color: hsla(0, 0%, 0%, 0.34);
  }
`;
const DetailActionWrapper = styled.div`
  flex: 0.3;
  padding: 20px 10px;

  p {
    color: #4d4d4d;
    font-family: 'Nunito', sans-serif;
  }
`;

const ActionDetailWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  margin-top: 50px;
`;

const CatDetail = () => {
  const dispatch = useDispatch();
  // const randomBreedId = useSelector(selectRandomBreedId);
  // const catBreed = useSelector(selectCatBreed);

  // const randomBreed = useSelector(selectRandomBreed);

  // console.log(Object.values(catBreed[randomBreedId])[0].id);

  const newCat = useSelector(selectRandomCat);

  return (
    <CatDetailWrapper>
      <DetailPhoto
        bg={newCat[0].url}
        onClick={() => dispatch(toggleLayout())}
      />

      <DetailBio>
        <span>{newCat[0].breeds[0].name}</span>

        <span>
          <span style={{ fontWeight: '400', fontSize: '17px' }}>
            Temperament
          </span>
          : {newCat[0].breeds[0].temperament}
        </span>

        <span>Life Span: {newCat[0].breeds[0].life_span} years</span>
      </DetailBio>

      <DetailActionWrapper>
        <p>{newCat[0].breeds[0].description}</p>

        <ActionDetailWrapper>
          <Cancel hasBg={true} width="90px" height="90px" size="55px" />
          <SuperLike hasBg={true} width="90px" height="90px" size="55px" />
          <Favorite hasBg={true} width="90px" height="90px" size="55px" />
        </ActionDetailWrapper>
      </DetailActionWrapper>
    </CatDetailWrapper>
  );
};

export default CatDetail;
