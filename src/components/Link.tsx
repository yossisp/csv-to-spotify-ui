import React, { ReactChild, ReactChildren } from 'react';
import NextLink from 'next/link';

interface Props {
  external?: boolean;
  href: string;
  as?: string;
  children: ReactChild | ReactChildren;
  onClick?: () => void;
}
const Link: React.FC<Props> = ({ external, href, children, as, onClick }) => {
  let link;

  if (external) {
    link = (
      <a href={href} target="_blank" rel="noreferrer" onClick={onClick}>
        {children}
      </a>
    );
  } else {
    link = (
      <NextLink href={href} as={as}>
        <a onClick={onClick}>{children}</a>
      </NextLink>
    );
  }
  return link;
};

export default Link;
