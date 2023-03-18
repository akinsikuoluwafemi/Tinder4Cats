import { NextPage } from 'next';
import Head from 'next/head';
import { SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { MdLogin, MdLogout } from 'react-icons/md';
import Link from 'next/link';
import { Favorite } from '@/components/Icons';

const Container = styled.section`
  min-height: 100vh;
  width: 100%;
  background: white;
  margin: 0 auto;
  transition: all 0.5s ease;
  font-family: roboto;

  @media (min-width: 768px) {
    width: 500px;
  }
`;

const Header = styled.header<{ show: boolean }>`
  // background: red;
  width: 100%;
  height: 70px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: ${({ show }) => (show ? 'flex' : 'none')};

  color: #444;
  padding: 0 20px;

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    li:first-of-type {
      font-size: 18px;
      font-weight: 400;
      cursor: pointer;
    }

    li:last-of-type {
      font-size: 18px;
      // color: green; //red
      cursor: pointer;
      padding-left: 20px;
    }
  }
`;

const TextHeader = styled.li`
  margin-right: auto;
  text-align: center;
  background: linear-gradient(90deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  list-style-type: none !important;

  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    font-weight: 800;
    font-size: 25px;

    @media (max-width: 768px) {
      font-size: 19px;
    }
  }
`;

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  showHeader?: boolean;
};

const MainLayout: NextPage<LayoutProps> = ({
  children,
  title = 'Tinder for cats',
  showHeader = true,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Tinder For Cats" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Header show={showHeader}>
          <ul>
            <TextHeader>
              <Link href="/">Tinder for Cats</Link>
            </TextHeader>

            <li>
              <Link href="/favorites">Favorites</Link>
            </li>

            <li>
              <Link href="/login">Login</Link>
            </li>
          </ul>
        </Header>

        {children}
      </Container>
    </>
  );
};

export default MainLayout;
