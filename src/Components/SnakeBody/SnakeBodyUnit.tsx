import { SnakeMovementTrace } from 'Definitions/Snake';
import snakeBodyCSS from 'Definitions/SnakeBodyUnitCSS';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

// Add more directions. Add corners.
// On head change direction send to body[0] new direction?
// Maybe new Observer for the direction?

const StyledDiv = styled.div<SnakeMovementTrace>`
  ${({ movementDirection, theme: { palette } }) =>
    snakeBodyCSS(movementDirection, palette.primary.main)}
`;

const SnakeUnit: FunctionComponent<SnakeMovementTrace> = (props) => <StyledDiv {...props} />;
export default SnakeUnit;
