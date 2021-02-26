import styled from 'styled-components';
import { fontSize, fontWeight } from 'styled-system';
import Link from '../components/Link';

const NextLinkStyled = styled(Link)`
  cursor: pointer;
  &:hover {
    color: ${({ hoverColor }: { hoverColor: string }) =>
      hoverColor || 'blue'} !important;
  }
  ${fontSize}
  ${fontWeight}
`;

export default NextLinkStyled;
