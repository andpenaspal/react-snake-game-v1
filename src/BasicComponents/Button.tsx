import React, { ButtonHTMLAttributes, FunctionComponent } from 'react';
import { Colors, IPalette } from 'styled';
import styled, { useTheme } from 'styled-components';

type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

interface StyledButtonProps extends NativeButtonProps {
  buttonColor: IPalette;
}
const StyledBaseButton = styled.button<StyledButtonProps>`
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: ${({ theme: { spacing } }) => spacing.space(1, 2)};
  background-color: ${({ buttonColor }) => buttonColor.main};
  background-color: ${({ buttonColor }) => buttonColor.main};
  color: ${({ buttonColor }) => buttonColor.contrastText};
`;

export interface ButtonProps extends NativeButtonProps {
  color: Colors;
}

const Button: FunctionComponent<ButtonProps> = ({ color = 'primary', type, ...rest }) => {
  const theme = useTheme();
  return <StyledBaseButton type={type || 'button'} buttonColor={theme.palette[color]} {...rest} />;
};

export default Button;
