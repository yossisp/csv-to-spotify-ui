import React, { useContext } from 'react';
import { Card, Span, Flex } from 'theme';
import { AppContext, Odometer } from 'components';
import styled, { keyframes } from 'styled-components';

const blinker = keyframes`
50% {
  opacity: 0;
}
`;

const BlinkingAnimation = styled(Card)`
  animation: ${blinker} 3s linear infinite;
`;

/**
 * Updates CSV playlist job status.
 * @returns React component.
 */
const Progress = () => {
  const {
    errors,
    progress,
    isUserFound,
    csvFileName,
    isJobFinished,
  } = useContext(AppContext);
  console.log('progress errors', errors);
  return (
    <Flex column>
      {csvFileName && !isJobFinished && (
        <BlinkingAnimation pb={24}>
          Adding your tracks to {csvFileName} Spotify playlist...
        </BlinkingAnimation>
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
