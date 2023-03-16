import { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";

const Container = styled.section`
  min-height: 100vh;
  width: 100%;
  background: white;
  margin: 0 auto;
  font-family: roboto;

  @media (min-width: 768px) {
    width: 500px;
  }
`;

const Header = styled.header`
  // background: red;
  width: 100%;
  height: 70px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #444;
`;

const TextHeader = styled.h2`
  text-align: center;
  font-weight: 500;
`;

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const MainLayout: NextPage<LayoutProps> = ({
  children,
  title = "Tinder for cats",
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
        <Header>
          <TextHeader> Tinder for Cats</TextHeader>
        </Header>

        {children}
      </Container>
    </>
  );
};

export default MainLayout;
