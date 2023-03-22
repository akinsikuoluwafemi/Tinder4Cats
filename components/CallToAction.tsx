import useCats from '@/hooks/useCats';
import useFavorites from '@/hooks/useFavorites';
import { selectRandomCat } from '@/slices/catDataSlice';
import { selectUser } from '@/slices/userSlice';
import { User } from '@/types/globalTypes';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Back, Cancel, Favorite, SuperLike } from './Icons';
import { ToastContainer, toast } from 'react-toastify';

const ActionWrapper = styled.div`
  height: 150px;
  width: 100%;
  margin-top: 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const CallToAction = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const router = useRouter();

  const user: User = useSelector(selectUser);
  const cat = useSelector(selectRandomCat);
  console.log(cat);

  console.log(user);

  useEffect(() => {
    const tokenStr =
      typeof window !== 'undefined' && localStorage.getItem('tokenstr');
    if (tokenStr) {
      setLoggedIn(true);
      const tkn = JSON.parse(tokenStr);
      setToken(tkn);
    } else {
      setLoggedIn(false);
    }
  }, []);
  const { callCat } = useCats();

  const { addToFavorites } = useFavorites();

  return (
    <>
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
        <span
          onClick={() => {
            if (loggedIn) {
              addToFavorites();
            } else {
              let timer: any;
              toast.info('Please login to add to favorites', {
                position: 'top-center',
                pauseOnHover: true,
                autoClose: 4000,
              });
              timer = setTimeout(() => {
                router.push('/login');
              }, 2000);
              return () => clearTimeout(timer);
            }
          }}
        >
          <Favorite />
        </span>
      </ActionWrapper>
      <ToastContainer />
    </>
  );
};

export default CallToAction;
