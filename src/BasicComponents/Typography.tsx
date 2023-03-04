import styled from 'styled-components';

const Typography = styled.div`
  font-size: ${({
    theme: {
      typography: { fontSize },
    },
  }) => fontSize.medium};
  font-weight: ${({
    theme: {
      typography: { fontWeight },
    },
  }) => fontWeight.normal};
  color: ${({
    theme: {
      palette: {
        general: { typography },
      },
    },
  }) => typography.primaryText};
`;

export default Typography;
