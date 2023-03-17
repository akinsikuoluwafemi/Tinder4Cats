import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { toggleLayout } from "@/slices/layoutSlice";

const CatWrapper = styled.figure`
  height: 500px;
  width: 100%;
  background: teal;
  margin: 0 auto;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

const CatImg = styled.img`
  flex: 0.9;
  background-image: url("https://cdn2.thecatapi.com/images/ao2.jpg");
  background-size: cover;
  background-position: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const CatBio = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  flex: 0.1;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  color: #000;
  padding: 20px 10px;
`;

const CatCaption = styled.figcaption``;

const CatsName = styled.span`
  font-size: 30px;
  font-weight: 500;
  color: #4d4d4d;
`;

const CatsProf = styled.span`
  font-size: 14px;
  color: #4d4d4d;
`;
const CatProfile = () => {
  const dispatch = useDispatch();
  return (
    <CatWrapper onClick={() => dispatch(toggleLayout())}>
      <CatImg />

      <CatBio>
        <CatsName>Bean, 4</CatsName>
        <CatsProf>Nurse</CatsProf>
      </CatBio>
    </CatWrapper>
  );
};

export default CatProfile;
