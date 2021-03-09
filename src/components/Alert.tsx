import React from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

/**
 * Displays errors
 * @param props alert props
 * @returns React component
 */
const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default Alert;
