import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import styled from 'styled-components';
import CatProfile from '@/components/CatProfile';
import CallToAction from '@/components/CallToAction';
import CatDetail from '@/components/CatDetail';
import MainLayout from '@/layouts/mainLayout';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLayout } from '@/slices/layoutSlice';
import { getCatBreed } from '@/slices/catDataSlice';
import { useEnvVars } from '@/utils/useEnvVars';

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
  const dispatch = useDispatch();

  const fetchBreeds = useCallback(() => {
    dispatch(getCatBreed(API_ENDPOINT) as any);
  }, [API_ENDPOINT, dispatch]);
  useEffect(() => {
    fetchBreeds();
  }, [fetchBreeds]);

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
