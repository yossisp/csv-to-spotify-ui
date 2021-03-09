import React, { ReactChild, ReactChildren } from 'react';
import NextLink from 'next/link';

interface Props {
  /**
   * if the link leads to another website
   */
  external?: boolean;
  /**
   * next.js page route
   */
  href: string;
  /**
   * URL to display in browser
   */
  as?: string;
  /**
   * children component(s)
   */
  children: ReactChild | ReactChildren;
  /**
   * function to call when the link is clicked
   */
  onClick?: () => void;
}

/**
 * @returns React component
 */
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
