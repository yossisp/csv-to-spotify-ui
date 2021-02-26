import React, { ReactElement } from 'react';
import { Card } from 'theme';
import Nav from './nav';

const Layout: React.FC = ({ children }) => {
  return (
    <Card>
      <Nav />
      {children}
    </Card>
  );
};

export default Layout;
