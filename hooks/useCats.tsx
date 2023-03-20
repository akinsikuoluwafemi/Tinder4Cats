import {
  getRandomCat,
  selectCatBreed,
  setRandomBreed,
  setRandomBreedId,
} from '@/slices/catDataSlice';
import { rand_breed } from '@/utils/randomBreed';
import { useEnvVars } from '@/utils/useEnvVars';
import { useDispatch, useSelector } from 'react-redux';

const useCats = () => {
  const { API_ENDPOINT, API_KEY } = useEnvVars();

  const catBreed = useSelector(selectCatBreed);
  const dispatch = useDispatch();

  const callCat = () => {
    const randomCatBreedId = rand_breed(catBreed);
    const breed_id: string = Object.values(catBreed[randomCatBreedId])[0].id;
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

  return {
    callCat,
  };
};

export default useCats;
