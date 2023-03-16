import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import styled from "styled-components";
import CatProfile from "@/components/CatProfile";
import CallToAction from "@/components/CallToAction";

const HomeSection = styled.section`
  height: 100vh;
  background: #f5f5f5;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export default function Home() {
  return (
    <HomeSection>
      <CatProfile />
      <CallToAction />
    </HomeSection>
  );
}
