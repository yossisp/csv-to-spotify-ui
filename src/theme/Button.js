import React from 'react';
import styled from 'styled-components';
import { width, height, space, border, typography } from 'styled-system';
import ButtonMuiRaw from '@material-ui/core/Button';

export const ButtonMui = ({ children, ...rest }) => (
  <ButtonMuiRaw variant="contained" color="primary" {...rest}>
    {children}
  </ButtonMuiRaw>
);

const Button = styled.button`
  border-radius: 0;
  border: 1px solid gray;
  cursor: pointer;
  ${width}
  ${space}
  ${border}
  ${height}
  ${typography}
`;

export default Button;
