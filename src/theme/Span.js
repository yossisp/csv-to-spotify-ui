import styled from 'styled-components';
import { width, space, typography, color } from 'styled-system';
import { bold } from './system';

const Span = styled.span`
  ${width}
  ${space}
  ${typography}
  ${bold}
  ${color}
`;

export default Span;
