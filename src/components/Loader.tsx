import React from 'react';
import LoaderSpinner from 'react-loader-spinner';
import { Wrapper } from './Modal';

interface Props {
  isLoading: boolean;
}

/**
 * Displays loading animation.
 * @param isLoading should the component be displayed
 */
const Loader: React.FC<Props> = ({ isLoading }) => (
  <Wrapper>
    <LoaderSpinner
      type="Audio"
      color="green"
      height={100}
      width={100}
      visible={isLoading}
    />
  </Wrapper>
);

export default Loader;
