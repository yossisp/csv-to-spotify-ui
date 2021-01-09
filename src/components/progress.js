import React, { useContext } from 'react';
import { Card } from 'theme';
import PropTypes from 'prop-types';
import { AppContext } from 'components';
import { serverErrors } from 'config';

const Progress = ({ progress, isUserFound, csvFileName }) => {
  const { errors } = useContext(AppContext);
  return (
    <>
      {csvFileName && (
        <Card pb={24}>
          Adding your tracks to {csvFileName} Spotify playlist...
        </Card>
      )}
      {errors && (
        <Card>
          {errors.map((error, index) => (
            <Card key={index}>{serverErrors[error]}</Card>
          ))}
        </Card>
      )}
      {isUserFound === false && (
        <Card>
          Unfortunately, your Spotify user was not found. Please try signing in
          again.
        </Card>
      )}
      {progress ? (
        <>
          <Card>Tracks Added: {progress.tracksAdded}</Card>
          <Card>Tracks Not Added: {progress.tracksNotAdded}</Card>
        </>
      ) : null}
    </>
  );
};

Progress.propTypes = {
  progress: PropTypes.object,
  isUserFound: PropTypes.bool,
  csvFileName: PropTypes.string,
};

export default Progress;
