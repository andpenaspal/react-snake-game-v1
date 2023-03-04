import { BorderFlexContainer } from 'BasicComponents/FlexContainer';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import { IColors } from 'styled';
import styled from 'styled-components';
import Button from './Button';
import { Header3 } from './Header';
import Typography from './Typography';

const ModalContainer = styled(BorderFlexContainer)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({
    theme: {
      palette: {
        general: { backgroundColor },
      },
    },
  }) => backgroundColor.light};
  padding: ${({
    theme: {
      spacing: { space },
    },
  }) => space(5)};
  z-index: 50;
  flex-direction: column;
  justify-content: space-between;
  min-height: 120px;
  width: 450px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0%;
  left: 0;
  bottom: 0;
  background-color: ${({
    theme: {
      palette: {
        general: { backgroundColor },
      },
    },
  }) => backgroundColor.overlay};
  z-index: 50;
`;

const StyledTypography = styled(Typography)`
  text-align: center;
  margin-bottom: 40px;
`;

// Do we need children or does it go automatically?
interface BasicModalProps extends PropsWithChildren {
  buttonText: string;
  buttonColor: keyof IColors;
  onClose: () => void;
  heading?: string;
}

const BasicButtonModal: FunctionComponent<BasicModalProps> = ({
  buttonText,
  buttonColor,
  onClose,
  heading,
  children,
}) =>
  ReactDOM.createPortal(
    <>
      <Overlay />
      <ModalContainer>
        {heading && <Header3>{heading}</Header3>}
        <StyledTypography>{children}</StyledTypography>
        <Button color={buttonColor} onClick={onClose}>
          {buttonText}
        </Button>
      </ModalContainer>
    </>,
    document.getElementById('modal') as HTMLElement,
  );

export default BasicButtonModal;
