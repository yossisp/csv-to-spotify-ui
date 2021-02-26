import React, { ReactChild, ReactChildren } from 'react';
import NextLink from 'next/link';

interface Props {
  external?: boolean;
  href: string;
  as?: string;
  children: ReactChild | ReactChildren;
}
const Link: React.FC<Props> = ({ external, href, children, as }) => {
  let link;
  if (external) {
    link = (
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  } else {
    link = (
      <NextLink href={href} as={as}>
        {children}
      </NextLink>
    );
  }
  return link;
};

export default Link;
