import MainLayout from '@/layouts/mainLayout';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const Favorites = () => {
  const router = useRouter();

  useEffect(() => {
    const tokenStr =
      typeof window !== 'undefined' && localStorage.getItem('tokenstr');
    if (!tokenStr) {
      router.push('/');
    }
  }, [router]);

  return <MainLayout>Favorites</MainLayout>;
};

export default Favorites;
