import React from "react";
import styled from "styled-components";
import { Back, Cancel, Favorite, SuperLike } from "./Icons";

const ActionWrapper = styled.div`
  height: 150px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 40px;
`;

const CallToAction = () => {
  return (
    <ActionWrapper>
      <Back />
      <Cancel />
      <SuperLike />
      <Favorite />
    </ActionWrapper>
  );
};

export default CallToAction;
