import { HorizontalDirection, SnakeUnitProps, snakeDimension } from 'Definitions/Snake';
import { snakeHeadAnimation } from 'Definitions/SnakeEat';
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
  border-radius: ${`${snakeDimension.head}px ${snakeDimension.head}px 0px 0px;`};
  animation: ${({ movementDirection: movement }) => snakeHeadAnimation[movement].topSideAnimation}
    0.5s infinite linear;
`;

const SnakeHeadBottom = styled(BaseHorizontalSnakeHead)`
  bottom: 0;
  border-radius: ${`0 0 ${snakeDimension.head}px ${snakeDimension.head}px`};
  animation: ${({ movementDirection: movement }) =>
      snakeHeadAnimation[movement].bottomSideAnimation}
    0.5s infinite linear;
`;

const SnakeHeadHorizontal: FunctionComponent<SnakeUnitProps<HorizontalDirection>> = (props) => (
  <>
    <SnakeHeadTop {...props} />
    <SnakeHeadBottom {...props} />
  </>
);

export default SnakeHeadHorizontal;
