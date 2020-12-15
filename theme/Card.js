import styled from 'styled-components';
import { width, space, typography } from 'styled-system';
import { bold } from './system';

const Card = styled.div`
  ${width}
  ${space}
  ${typography}
  ${bold}
`;

export default Card;
