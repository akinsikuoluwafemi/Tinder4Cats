import { toggleLayout } from '@/slices/layoutSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Cancel, Favorite, SuperLike } from './Icons';
import {
  selectRandomBreedId,
  selectRandomBreed,
  selectCatBreed,
  selectRandomCat,
  selectCatLoading,
} from '@/slices/catDataSlice';
import useCats from '@/hooks/useCats';
import { LoadingIndicator } from '@/utils/styles';
import useFavorites from '@/hooks/useFavorites';
import { useRouter } from 'next/router';

const CatDetailWrapper = styled.section`
  background: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const DetailPhoto = styled.div<{ bg: string }>`
  background-image: url(${({ bg }) => bg});
  background-size: cover;
  background-position: top center;
  height: 480px;
  // background: red;
  background-repeat: no-repeat;
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
  flex: 0.2;
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
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const tokenStr =
      typeof window !== 'undefined' && localStorage.getItem('tokenstr');
    if (tokenStr) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const newCat = useSelector(selectRandomCat);
  const loading = useSelector(selectCatLoading);
  const { callCat } = useCats();
  const { addToFavorites } = useFavorites();

  return (
    <CatDetailWrapper>
      {loading && <LoadingIndicator>Loading...</LoadingIndicator>}
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
          <span
            onClick={() => {
              callCat();
              dispatch(toggleLayout());
            }}
          >
            <Cancel hasBg={true} width="90px" height="90px" size="55px" />
          </span>
          <span
            onClick={() => {
              callCat();
              dispatch(toggleLayout());
            }}
          >
            <SuperLike hasBg={true} width="90px" height="90px" size="55px" />
          </span>
          <span
            onClick={() => {
              if (loggedIn) {
                addToFavorites();
                dispatch(toggleLayout());
              } else {
                alert('Please login to add to favorites');
                router.push('/login');
                dispatch(toggleLayout());
              }
            }}
          >
            <Favorite hasBg={true} width="90px" height="90px" size="55px" />
          </span>
        </ActionDetailWrapper>
      </DetailActionWrapper>
    </CatDetailWrapper>
  );
};

export default CatDetail;
