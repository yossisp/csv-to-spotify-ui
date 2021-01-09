import styled from 'styled-components';
import { width, height, space, border, typography } from 'styled-system';

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
