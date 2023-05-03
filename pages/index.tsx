import styled from 'styled-components';
import CatProfile from '@/components/CatProfile';
import CallToAction from '@/components/CallToAction';
import CatDetail from '@/components/CatDetail';
import MainLayout from '@/layouts/mainLayout';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLayout } from '@/slices/layoutSlice';
import { getCatBreed } from '@/slices/catDataSlice';
import { useEnvVars } from '@/utils/useEnvVars';
import useCats from '@/hooks/useCats';

const HomeSection = styled.section`
  overflow: hidden;

  // height: 100vh;
  background: #fff;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

export default function Home() {
  const { API_ENDPOINT } = useEnvVars();
  const { callCat } = useCats();
  const dispatch = useDispatch();

  const fetchBreeds = useCallback(() => {
    dispatch(getCatBreed(API_ENDPOINT) as any);
  }, [API_ENDPOINT, dispatch]);
  useEffect(() => {
    fetchBreeds();
    callCat();
  }, []);

  const isLayoutUsed = useSelector(selectLayout);

  return (
    <MainLayout showHeader={isLayoutUsed}>
      {isLayoutUsed ? (
        <HomeSection>
          <CatProfile />
          <CallToAction />
        </HomeSection>
      ) : (
        <CatDetail />
      )}
    </MainLayout>
  );
}
