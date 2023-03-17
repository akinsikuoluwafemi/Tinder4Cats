import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import styled from "styled-components";
import CatProfile from "@/components/CatProfile";
import CallToAction from "@/components/CallToAction";
import CatDetail from "@/components/CatDetail";
import MainLayout from "@/layouts/mainLayout";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectLayout } from "@/slices/layoutSlice";

const HomeSection = styled.section`
  height: 100vh;
  background: #f5f5f5;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

export default function Home() {
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
