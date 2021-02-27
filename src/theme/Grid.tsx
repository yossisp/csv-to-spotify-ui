import styled from 'styled-components';
import { width } from 'styled-system';
import Card from './Card';

const Grid = styled(Card)`
  display: grid;
  grid-template-columns: ${({ columns }: { columns: string }) =>
    columns || '1fr 1fr 1fr'};
  ${width}
`;

export default Grid;
