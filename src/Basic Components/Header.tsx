import styled from 'styled-components';

export const Header1 = styled.h1`
  font-size: ${({
    theme: {
      typography: { fontSize },
    },
  }) => fontSize.extraLarge};
  font-weight: ${({
    theme: {
      typography: { fontWeight },
    },
  }) => fontWeight.extraHeavy};
  color: ${({
    theme: {
      palette: {
        general: { typography },
      },
    },
  }) => typography.primaryText};
`;

export const Header2 = styled.h2`
  font-size: ${({
    theme: {
      typography: { fontSize },
    },
  }) => fontSize.large};
  font-weight: ${({
    theme: {
      typography: { fontWeight },
    },
  }) => fontWeight.heavy};
  color: ${({
    theme: {
      palette: {
        general: { typography },
      },
    },
  }) => typography.primaryText};
`;

export const Header3 = styled.h3`
  font-size: ${({
    theme: {
      typography: { fontSize },
    },
  }) => fontSize.mediumLarge};
  font-weight: ${({
    theme: {
      typography: { fontWeight },
    },
  }) => fontWeight.normalHeavy};
  color: ${({
    theme: {
      palette: {
        general: { typography },
      },
    },
  }) => typography.primaryText};
`;
