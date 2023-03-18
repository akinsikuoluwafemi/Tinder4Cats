import { MdRefresh } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { BsFillStarFill } from 'react-icons/bs';
import styled from 'styled-components';
import { IconDimensions, IconProps } from '../../types/globalTypes';

const IconWrapper = styled.span<IconProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 50%;
  background: ${({ background }) => (background ? background : '#fff')};
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

export const Cancel = ({
  size = '35px',
  width = '70px',
  height = '70px',
  hasBg,
}: IconDimensions) => {
  return (
    <IconWrapper
      width={width}
      height={height}
      color={hasBg ? '#fff' : 'hsla(0, 100%, 50%, 1)'}
      size={size}
      background={hasBg ? 'red' : '#fff'}
    >
      <FaTimes />
    </IconWrapper>
  );
};

export const Back = ({
  size = '25px',
  width = '47px',
  height = '47px',
}: IconDimensions) => {
  return (
    <IconWrapper
      width={width}
      height={height}
      color="hsla(45, 100%, 50%, 1)"
      size={size}
      rotate="180deg"
    >
      <MdRefresh />
    </IconWrapper>
  );
};

export const SuperLike = ({
  size = '35px',
  width = '70px',
  height = '70px',
  hasBg,
}: IconDimensions) => {
  return (
    <IconWrapper
      width={width}
      height={height}
      color={hasBg ? '#fff' : 'hsla(45, 100%, 50%, 1)'}
      size={size}
      background={hasBg ? 'hsla(45, 100%, 50%, 1)' : '#fff'}
    >
      <BsFillSuitHeartFill />
    </IconWrapper>
  );
};

export const Favorite = ({
  size = '25px',
  width = '47px',
  height = '47px',
  hasBg,
}: IconDimensions) => {
  return (
    <IconWrapper
      width={width}
      height={height}
      color={hasBg ? '#fff' : 'hsla(200, 100%, 50%, 1)'}
      size={size}
      background={hasBg ? 'hsla(200, 100%, 50%, 1)' : '#fff'}
    >
      <BsFillStarFill />
    </IconWrapper>
  );
};
