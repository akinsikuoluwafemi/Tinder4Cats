import { selectRandomCat } from '@/slices/catDataSlice';
import { selectUser, authFavCat } from '@/slices/userSlice';
import { useEnvVars } from '@/utils/useEnvVars';
import { User } from '@prisma/client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useCats from './useCats';

const useFavorites = () => {
  const { callCat } = useCats();
  const dispatch = useDispatch();
  const [token, setToken] = useState('');
  const { API_KEY } = useEnvVars();
  const cat = useSelector(selectRandomCat);
  const image_id = cat[0]?.id;

  useEffect(() => {
    const tokenStr =
      typeof window !== 'undefined' && localStorage.getItem('tokenstr');

    if (tokenStr) {
      const tkn = JSON.parse(tokenStr);
      setToken(tkn);
    }
  }, []);
  const user: User = useSelector(selectUser);

  const addToFavorites = async () => {
    try {
      const { data } = await axios.post(
        'api/favorites/',
        {
          userId: user.id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(data);
      if (data.success === true) {
        try {
          const { data } = await axios.post(
            'https://api.thecatapi.com/v1/favourites',
            {
              image_id,
              sub_id: user.id,
            },
            {
              headers: {
                'x-api-key': API_KEY,
              },
            },
          );
          console.log(data);
          callCat();

          return data;
        } catch (err: any) {
          alert(err.response.data);
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    addToFavorites,
  };
};

export default useFavorites;
