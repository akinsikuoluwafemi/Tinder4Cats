import { NextPage } from "next";
import Head from "next/head";
import { SetStateAction, useState } from "react";
import styled from "styled-components";
import { MdLogin, MdLogout } from "react-icons/md";

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
  display: ${({ show }) => (show ? "flex" : "none")};
  justify-content: space-around;
  align-items: center;
  color: #444;
  // padding: 0 20px;

  span:first-of-type {
    font-size: 18px;
    font-weight: 400;
    cursor: pointer;
  }

  span:last-of-type {
    font-size: 25px;
    color: green; //red
    cursor: pointer;
  }
`;

const TextHeader = styled.h2`
  text-align: center;
  font-weight: 500;
  background: linear-gradient(90deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
`;

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  showHeader?: boolean;
};

const MainLayout: NextPage<LayoutProps> = ({
  children,
  title = "Tinder for cats",
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
          <TextHeader> Tinder for Cats</TextHeader>

          <span>Favorites</span>
          <span>
            <MdLogin />
          </span>
        </Header>

        {children}
      </Container>
    </>
  );
};

export default MainLayout;
