import React, { useContext } from 'react';
import { Card } from 'theme';
import Nav from './Nav';
import Alert from './Alert';
import { AppContext } from './AppContextProvider';

/**
 * Defines the layout skeleton for the application and displays errors when
 * they exist.
 * @returns React component.
 */
const Layout: React.FC = ({ children }) => {
  const { errors } = useContext(AppContext);
  return (
    <Card px={100}>
      {!!errors.length &&
        errors.map((error, index) => (
          <Alert key={index} severity="error">
            {error}
          </Alert>
        ))}
      <Nav />
      {children}
    </Card>
  );
};

export default Layout;
