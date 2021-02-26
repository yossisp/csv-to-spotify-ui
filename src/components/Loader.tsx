import React from 'react';
import LoaderSpinner from 'react-loader-spinner';

interface Props {
  isLoading: boolean;
}
const Loader: React.FC<Props> = ({ isLoading }) => (
  <LoaderSpinner
    type="Audio"
    color="green"
    height={100}
    width={100}
    visible={isLoading}
  />
);

export default Loader;
