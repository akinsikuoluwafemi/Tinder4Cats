import { MdRefresh } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { BsFillStarFill } from "react-icons/bs";
import styled from "styled-components";

type IconProps = {
  width: string;
  height: string;
  color: string;
  size: string;
  rotate?: string;
  background?: string;
};

const IconWrapper = styled.span<IconProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 50%;
  background: ${({ background }) => (background ? background : "#fff")};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);

  svg {
    font-size: ${({ size }) => size};
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: ${({ color }) => color};
    transform: rotate(${({ rotate }) => rotate});
    cursor: pointer;
  }
`;

export const Cancel = () => {
  return (
    <IconWrapper
      width="70px"
      height="70px"
      color="hsla(10, 100%, 60%, 1)"
      size="35px"
    >
      <FaTimes />
    </IconWrapper>
  );
};

export const Back = () => {
  return (
    <IconWrapper
      width="47px"
      height="47px"
      color="hsla(45, 100%, 50%, 1)"
      size="25px"
      rotate="180deg"
    >
      <MdRefresh />
    </IconWrapper>
  );
};

export const SuperLike = () => {
  return (
    <IconWrapper
      width="70px"
      height="70px"
      color="hsla(170, 100%, 45%, 1)"
      size="35px"
    >
      <BsFillSuitHeartFill />
    </IconWrapper>
  );
};

export const Favorite = () => {
  return (
    <IconWrapper
      width="47px"
      height="47px"
      color="hsla(200, 100%, 50%, 1)"
      size="25px"
    >
      <BsFillStarFill />
    </IconWrapper>
  );
};
