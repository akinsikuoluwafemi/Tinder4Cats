import MainLayout from '@/layouts/mainLayout';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useEnvVars } from '@/utils/useEnvVars';
import { useSelector } from 'react-redux';
import { selectUser } from '@/slices/userSlice';
import { favoriteCatResponse, User } from '@/types/globalTypes';
import axios from 'axios';
import styled from 'styled-components';
import { Favorite } from '@/components/Icons';

const FavoriteContainer = styled.section`
  padding: 20px;
  height: auto;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: start;
  align-items: start;
  background: white;
`;

const FavoriteCard = styled.div<{ bg: string }>`
  background-image: url(${({ bg }) => bg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
  position: relative;
  width: 220px;
  height: 200px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 426px) {
    width: 100%;
  }
`;

const FavoriteIcon = styled.span`
  // background: white;
  z-index: 10;
  // height: 30px;
  // width: 30px;
  // border-radius: 50%;
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
`;

const Text = styled.h3`
  margin-top: 3rem;
  text-align: center;
  margin: 0 auto;
  color: #000;
`;

const Favorites = () => {
  const [allFavs, setAllFavs] = useState<favoriteCatResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { API_ENDPOINT, API_KEY } = useEnvVars();
  const user: User = useSelector(selectUser);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${API_ENDPOINT}/v1/favourites?limit=8&sub_id=${user.id}&order=DESC`,
        {
          headers: {
            'content-type': 'application/json',
            'x-api-key': API_KEY,
          },
        },
      );
      setAllFavs(data);
      return data;
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const tokenStr =
      typeof window !== 'undefined' && localStorage.getItem('tokenstr');
    if (!tokenStr) {
      router.push('/');
    } else {
      fetchFavorites();
    }
  }, []);

  return (
    <MainLayout
      title="Tinder for cats - Favorites"
      height={allFavs.length > 6 ? 'auto' : '100vh'}
    >
      <FavoriteContainer>
        {allFavs.length === 0 && !loading && (
          <Text>You have not Favorite Cat</Text>
        )}
        {loading && <Text>Loading...</Text>}
        {allFavs &&
          allFavs.map((fav) => {
            return (
              <FavoriteCard bg={fav.image.url} key={fav.id}>
                {!loading && (
                  <FavoriteIcon>
                    <Favorite />
                  </FavoriteIcon>
                )}
              </FavoriteCard>
            );
          })}
      </FavoriteContainer>
    </MainLayout>
  );
};

export default Favorites;
