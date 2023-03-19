import { MovementDirection, MovementDirectionCorner, MOVEMENT_DIRECTION_CORNER } from './Snake';

const baseCSS = (bgColor: string) => `
background-color: ${bgColor};
`;

const baseCornerCSS = `
  width: 40%;
  height: 40%;
  border-radius: 20px 20px 5px 5px;
  margin: 1px;
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
  margin-bottom: 1px;

`;

const leftMoveCSS = `
  width: 100%;
  height: 50%;
  border-radius: 20px 20px 5px 5px;
  align-self: flex-end;
  margin-bottom: 1px;
`;

const downMoveCSS = `
  width: 50%;
  height: 100%;
  border-radius: 20px 5px 5px 20px;
  margin-left: auto;
  margin-right: 1px;
`;

const upMoveCSS = `
  width: 50%;
  height: 100%;
  border-radius: 5px 20px 20px 5px;
  margin-right: auto;
  margin-left: 1px;
`;

const downLeftMoveCSS = (bgColor: string) => `
  width: 100%;
  height: 100%;
  position: relative;
  &:before {
    position: absolute;
    background: ${bgColor};
    content: '';
    width: 90%;
    height: 50%;
    border-radius: 20px 20px 5px 5px;
    top: 45%;
  }
  &:after {
    position: absolute;
    background: ${bgColor};
    left: 45%;
    width: 50%;
    height: 90%;
    content: '';
    border-radius: 20px 5px 5px 20px;
  }
`;

const leftUpMoveCSS = (bgColor: string) => `
  width: 100%;
  height: 100%;
  position: relative;
  &:before {
    position: absolute;
    background: ${bgColor};
    content: '';
    width: 85%;
    height: 50%;
    border-radius: 20px 20px 5px 5px;
    top: 45%;
    margin-left: 2px;
  }
  &:after {
    position: absolute;
    background: ${bgColor};
    right: 40%;
    width: 50%;
    height: 90%;
    content: '';
    border-radius: 5px 20px 5px 20px;
    margin-top: 1px;
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
    DOWN_LEFT: downLeftMoveCSS,
    LEFT_UP: leftUpMoveCSS,
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
