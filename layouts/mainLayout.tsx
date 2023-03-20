import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Container = styled.section<{ height: string }>`
  height: ${({ height }) => height};
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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid #eee;

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
    // font-weight: 500;

    li:first-of-type {
      // font-size: 18px;
      // font-weight: 400;
      cursor: pointer;
    }

    li:last-of-type {
      // font-weight: 500;
      font-size: 18px;
      // color: green;
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
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const router = useRouter();
  console.log(router.pathname);
  const home = router.pathname === '/';
  const favorite = router.pathname === '/favorites';

  useEffect(() => {
    const tokenStr =
      typeof window !== 'undefined' && localStorage.getItem('tokenstr');
    if (tokenStr) {
      const token = JSON.parse(tokenStr);
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Tinder For Cats" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container height={home ? 'auto' : favorite ? 'auto' : '100vh'}>
        <Header show={showHeader}>
          <ul>
            <TextHeader>
              <Link href="/">Tinder for Cats</Link>
            </TextHeader>

            <li>
              <Link href="/favorites">Favorites</Link>
            </li>

            {loggedIn ? (
              <li>
                <Link href="/logout">Logout</Link>
              </li>
            ) : (
              <li>
                <Link href="/login">Login</Link>
              </li>
            )}
          </ul>
        </Header>

        {children}
      </Container>
    </>
  );
};

export default MainLayout;
