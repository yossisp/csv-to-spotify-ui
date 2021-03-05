import React, { ReactChild, ReactChildren } from 'react';
import styled from 'styled-components';
import { typography, space } from 'styled-system';
import { motion } from 'framer-motion';

interface Props {
  isAnimated?: boolean;
  rest: unknown;
  children: ReactChild | ReactChildren;
}

const H1Raw = styled.h1`
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  ${space}
  ${typography}
`;

const ANIMATE_X = 100;

export const H1: React.FC<Props> = ({ children, isAnimated, ...rest }) =>
  isAnimated ? (
    <H1Raw pr={ANIMATE_X * 2} {...rest}>
      <motion.div animate={{ x: ANIMATE_X }}>{children}</motion.div>
    </H1Raw>
  ) : (
    <H1Raw {...rest}>{children}</H1Raw>
  );
