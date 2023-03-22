import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setUser } from '@/slices/userSlice';
import { useDispatch } from 'react-redux';
import { User } from '@prisma/client';
import MainLayout from '@/layouts/mainLayout';

const Logout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem('tokenstr');
    localStorage.removeItem('user');
    dispatch(setUser({} as User));
    router.push('/login');
  });

  return <MainLayout>&nbsp;</MainLayout>;
};

export default Logout;
