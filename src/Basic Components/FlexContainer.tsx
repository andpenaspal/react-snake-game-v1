import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${({ theme: { spacing } }) => spacing.tinySpace(1)};
`;

export const BorderFlexContainer = styled(FlexContainer)`
  border: 1px solid
    ${({
      theme: {
        palette: { common },
      },
    }) => common.grey200};
  border-radius: ${({ theme: { general } }) => general.borderRadius};
`;
