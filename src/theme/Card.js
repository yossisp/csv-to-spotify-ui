import styled from 'styled-components';
import {
  width,
  space,
  typography,
  position,
  color,
  display,
} from 'styled-system';
import { bold } from './system';

const Card = styled.div`
  ${display}
  ${width}
  ${space}
  ${typography}
  ${bold}
  ${position}
  ${color}
`;

export default Card;
