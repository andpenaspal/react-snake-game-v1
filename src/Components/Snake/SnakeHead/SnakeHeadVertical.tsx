import { SnakeUnitProps, VerticalDirection, snakeDimension } from 'Definitions/Snake';
import { snakeHeadMovementCSS } from 'Definitions/SnakeEat';
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
  ${({ movementDirection: movement }) => snakeHeadMovementCSS[movement].rightSide}
`;

const SnakeLeft = styled(BaseVerticalSnakeHead)`
  left: 0;
  border-radius: ${`${snakeDimension.head}px 0px 0px ${snakeDimension.head}px`};
  ${({ movementDirection: movement }) => snakeHeadMovementCSS[movement].leftSide}
`;

const SnakeHeadVertical: FunctionComponent<SnakeUnitProps<VerticalDirection>> = (props) => (
  <>
    <SnakeRight {...props} />
    <SnakeLeft {...props} />
  </>
);

export default SnakeHeadVertical;
