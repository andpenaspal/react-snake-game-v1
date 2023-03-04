import { BackgroundColors } from 'styled';
import styled from 'styled-components';

interface ContainerProps {
  backgroundColor?: BackgroundColors;
}

export const FlexContainer = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${({ theme: { spacing } }) => spacing.tinySpace(1)};
  background-color: ${({
    theme: {
      palette: { general },
    },
    backgroundColor,
  }) => general.backgroundColor[backgroundColor!] || 'inherit'};
`;

export const BorderFlexContainer = styled(FlexContainer)`
  border: 1px solid
    ${({
      theme: {
        palette: { common },
      },
    }) => common.grey200};
  border-radius: 5px;
`;
