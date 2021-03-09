import React from 'react';
import LoaderSpinner from 'react-loader-spinner';
import { Wrapper } from './Modal';

interface Props {
  /**
   * Displays loading animation.
   */
  isLoading: boolean;
}

/**
 * @returns React component
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
