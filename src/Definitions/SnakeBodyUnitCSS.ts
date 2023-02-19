import { MovementDirection, MovementDirectionCorner, MOVEMENT_DIRECTION_CORNER } from './Snake';

const baseCSS = (bgColor: string) => `
background-color: ${bgColor};
`;

const baseCornerCSS = `
  width: 40%;
  height: 40%;
  border-radius: 20px 20px 5px 5px;
  `;

const downCornerCSS = `align-self: flex-end;`;

const rightCornerCSS = `margin-left: auto;`;

const leftCornerCSS = `margin-right: auto;`;

const leftDownCornerCSS = `
${baseCornerCSS}
${downCornerCSS}
${rightCornerCSS}
border-radius: 20px 20px 5px 20px;
`;

const upLeftMoveCSS = `
${baseCornerCSS}
${downCornerCSS}
${leftCornerCSS}
border-radius: 20px 20px 20px 5px;
`;

const rightMoveCSS = `
        width: 100%;
        height: 50%;
        border-radius: 20px 20px 5px 5px;
        align-self: flex-end;
`;

const leftMoveCSS = `
        width: 100%;
        height: 50%;
        border-radius: 20px 20px 5px 5px;
        align-self: flex-end;
`;

const downMoveCSS = `
        width: 50%;
        height: 100%;
        border-radius: 20px 5px 5px 20px;
        margin-left: auto;
`;

const upMoveCSS = `
        width: 50%;
        height: 100%;
        border-radius: 5px 20px 20px 5px;
        margin-right: auto;
`;

const downRightMoveCSS = (bgColor: string) => `
  width: 100%;
  height: 100%;
  position: relative;
  &:before {
    position: absolute;
    background: ${bgColor};
    content: '';
    width: 100%;
    height: 50%;
    border-radius: 20px 20px 5px 5px;
    top: 50%;
  }
  &:after {
    position: absolute;
    background: ${bgColor};
    left: 50%;
    width: 50%;
    height: 100%;
    content: '';
    border-radius: 20px 5px 5px 20px;
  }
`;

const downLeftMoveCSS = (bgColor: string) => `
  width: 100%;
  height: 100%;
  position: relative;
  &:before {
    position: absolute;
    background: ${bgColor};
    content: '';
    width: 100%;
    height: 50%;
    border-radius: 20px 20px 5px 5px;
    top: 50%;
  }
  &:after {
    position: absolute;
    background: ${bgColor};
    right: 50%;
    width: 50%;
    height: 100%;
    content: '';
    border-radius: 5px 20px 5px 20px;
  }
`;

const snakeBodyCSS: (
  movement: MovementDirection | MovementDirectionCorner,
  bgColor: string,
) => any = (v, bg) => {
  const simpleMovements: {
    [key in MovementDirection | MovementDirectionCorner]?: string | ((bgColor: string) => string);
  } = {
    UP: upMoveCSS,
    DOWN: downMoveCSS,
    RIGHT: rightMoveCSS,
    LEFT: leftMoveCSS,
    UP_RIGHT: rightMoveCSS,
    UP_LEFT: upLeftMoveCSS,
    DOWN_RIGHT: downMoveCSS,
    RIGHT_UP: upMoveCSS,
    RIGHT_DOWN: rightMoveCSS,
    LEFT_DOWN: leftDownCornerCSS,
  };

  const complexMovements: {
    [key in MOVEMENT_DIRECTION_CORNER.DOWN_LEFT | MOVEMENT_DIRECTION_CORNER.LEFT_UP]: (
      bgColor: string,
    ) => string;
  } = {
    DOWN_LEFT: downRightMoveCSS,
    LEFT_UP: downLeftMoveCSS,
  };

  if (v === MOVEMENT_DIRECTION_CORNER.DOWN_LEFT || v === MOVEMENT_DIRECTION_CORNER.LEFT_UP) {
    return complexMovements[v](bg);
  }

  return `${baseCSS(bg)}${simpleMovements[v]}`;
};

export default snakeBodyCSS;

/**
 * LEFT_DOWN -> Shows UP-right of the square
 */
