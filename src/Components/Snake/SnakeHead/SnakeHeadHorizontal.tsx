import { HorizontalDirection, SnakeUnitProps } from 'Definitions/Snake';
import { snakeHeadMovementCSS } from 'Definitions/SnakeEat';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const BaseHorizontalSnakeHead = styled.div<SnakeUnitProps<HorizontalDirection>>`
  background-color: ${({ theme: { palette }, color }) => palette[color].main};
  position: absolute;
  width: 100%;
  height: 50%;
`;

const SnakeHeadTop = styled(BaseHorizontalSnakeHead)`
  top: 0;
  border-radius: ${`10rem 10rem 0px 0px;`};
  ${({ movementDirection: movement }) => snakeHeadMovementCSS[movement].topSide}
`;

const SnakeHeadBottom = styled(BaseHorizontalSnakeHead)`
  bottom: 0;
  border-radius: ${`0 0 10rem 10rem`};
  ${({ movementDirection: movement }) => snakeHeadMovementCSS[movement].bottomSide}
`;

const SnakeHeadHorizontal: FunctionComponent<SnakeUnitProps<HorizontalDirection>> = (props) => (
  <>
    <SnakeHeadTop {...props} />
    <SnakeHeadBottom {...props} />
  </>
);

export default SnakeHeadHorizontal;
