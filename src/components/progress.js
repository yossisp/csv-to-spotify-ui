import React, { useContext } from 'react';
import { Card, Span } from 'theme';
import PropTypes from 'prop-types';
import { AppContext, Odometer } from 'components';
import { serverErrors } from 'config';

const Progress = () => {
  const { errors, progress, isUserFound, csvFileName } = useContext(AppContext);
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
          <Card fontSize={22} pt={32}>
            Tracks Added:
            <Span pl={16}>
              <Odometer value={progress.tracksAdded} format="(dddd)" />
            </Span>
          </Card>
          <Card fontSize={22}>
            Tracks Not Added:
            <Span pl={16}>
              <Odometer value={progress.tracksNotAdded} format="(dddd)" />
            </Span>
          </Card>
        </>
      ) : null}
    </>
  );
};

export default Progress;
