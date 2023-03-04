import { SnakeMovementTrace } from 'Definitions/Snake';
import snakeBodyCSS from 'Definitions/SnakeBodyUnitCSS';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div<SnakeMovementTrace>`
  ${({ movementDirection, theme: { palette } }) =>
    snakeBodyCSS(movementDirection, palette.primary.main)}
`;

const SnakeUnit: FunctionComponent<SnakeMovementTrace> = (props) => <StyledDiv {...props} />;
export default SnakeUnit;
