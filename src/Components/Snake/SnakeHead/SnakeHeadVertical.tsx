import { SnakeUnitProps, VerticalDirection, snakeDimension } from 'Definitions/Snake';
import { snakeHeadAnimation } from 'Definitions/SnakeEat';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const BaseVerticalSnakeHead = styled.div<SnakeUnitProps<VerticalDirection>>`
  background-color: ${({ theme: { palette }, color }) => palette[color].main};
  position: absolute;
  width: 50%;
  height: 100%;
`;

const SnakeRight = styled(BaseVerticalSnakeHead)`
  right: 0;
  border-radius: ${`0px ${snakeDimension.head}px ${snakeDimension.head}px 0px;`};
  animation: ${({ movementDirection: movement }) => snakeHeadAnimation[movement].rightSideAnimation}
    0.5s infinite linear;
`;

const SnakeLeft = styled(BaseVerticalSnakeHead)`
  left: 0;
  border-radius: ${`${snakeDimension.head}px 0px 0px ${snakeDimension.head}px`};
  animation: ${({ movementDirection: movement }) => snakeHeadAnimation[movement].leftSideAnimation}
    0.5s infinite linear;
`;

const SnakeHeadVertical: FunctionComponent<SnakeUnitProps<VerticalDirection>> = (props) => (
  <>
    <SnakeRight {...props} />
    <SnakeLeft {...props} />
  </>
);

export default SnakeHeadVertical;
