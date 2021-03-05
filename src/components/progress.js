import React, { useContext } from 'react';
import { Card, Span, Flex } from 'theme';
import { AppContext, Odometer } from 'components';
import { serverErrors } from 'config';
import styled, { keyframes } from 'styled-components';

const blinker = keyframes`
50% {
  opacity: 0;
}
`;

const BlinkingAnimation = styled(Card)`
  animation: ${blinker} 3s linear infinite;
`;

const Progress = () => {
  const { errors, progress, isUserFound, csvFileName } = useContext(AppContext);
  return (
    <Flex column>
      {csvFileName && (
        <BlinkingAnimation pb={24}>
          Adding your tracks to {csvFileName} Spotify playlist...
        </BlinkingAnimation>
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
        <Card width={300}>
          <Flex fontSize={22} pt={32} pb={16} justifyContent="space-between">
            Tracks Added:
            <Span pl={16}>
              <Odometer value={progress.tracksAdded} format="(dddd)" />
            </Span>
          </Flex>
          <Flex fontSize={22} justifyContent="space-between">
            Tracks Not Added:
            <Span pl={16}>
              <Odometer value={progress.tracksNotAdded} format="(dddd)" />
            </Span>
          </Flex>
        </Card>
      ) : null}
    </Flex>
  );
};

export default Progress;
