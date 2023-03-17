import { toggleLayout } from "@/slices/layoutSlice";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Cancel, Favorite, SuperLike } from "./Icons";

const CatDetailWrapper = styled.section`
  background: white;
  height: 100vh;
  display: flex;
  flex-direction: column; ;
`;

const DetailPhoto = styled.div`
  background-image: url("https://cdn2.thecatapi.com/images/ao2.jpg");
  background-size: cover;
  background-position: center;
  height: 450px;
  width: 100%;
  flex: 0.7;
  cursor: pointer;
`;

const DetailBio = styled.div`
  padding: 20px 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  border-bottom: 1px solid #e0e0e0;
  flex: 0.1;

  span:first-child {
    font-weight: 500;
    font-size: 25px;
    color: #222;
  }
  span:nth-child(2) {
    font-size: 17px;
    font-weight: 400;

    color: #222;
  }
  span:nth-child(3) {
    font-weight: 400;

    font-size: 17px;
    color: hsla(0, 0%, 0%, 0.34);
  }
`;
const DetailActionWrapper = styled.div`
  flex: 0.3;
  padding: 20px 10px;

  p {
    color: #4d4d4d;
    font-family: "Nunito", sans-serif;
  }
`;

const ActionDetailWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  margin-top: 50px;
`;

const CatDetail = () => {
  const dispatch = useDispatch();
  return (
    <CatDetailWrapper>
      <DetailPhoto onClick={() => dispatch(toggleLayout())} />

      <DetailBio>
        <span>Bean, 4</span>

        <span>Nurse</span>

        <span>715 kilometers away</span>
      </DetailBio>

      <DetailActionWrapper>
        <p>
          Wine enthusiast. 🧟 Zombie evangelist. Extreme 🍻 beeraholic. Tv
          specialist. Food junkie. Total writer.
        </p>

        <ActionDetailWrapper>
          <Cancel hasBg={true} width="90px" height="90px" size="55px" />
          <SuperLike hasBg={true} width="90px" height="90px" size="55px" />
          <Favorite hasBg={true} width="90px" height="90px" size="55px" />
        </ActionDetailWrapper>
      </DetailActionWrapper>
    </CatDetailWrapper>
  );
};

export default CatDetail;
