import styled from 'styled-components';
import { flexbox } from 'styled-system';
import Card from './Card';
import { column } from './system';

const Flex = styled(Card)`
  display: flex;
  ${flexbox}
  ${column}
`;

export default Flex;
