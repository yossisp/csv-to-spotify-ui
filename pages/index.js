import React, { useState, useEffect, useCallback } from 'react';
import { Progress, Nav, CSVUpload } from 'components';
import { useWebsocket } from 'hooks';

const wsMessageTypes = {
  update: 'UPDATE',
  jobFinished: 'JOB_FINISHED',
  user: 'USER',
};

const NextAuth = () => {
  const [userSpotifyID, setUserSpotifyID] = useState();
  const [isUserFound, setIsUserFound] = useState();
  const [progress, setProgress] = useState();
  const [csvFileName, setCSVFileName] = useState();
  const onMessage = useCallback((event) => {
    const parsed = JSON.parse(event.data);
    switch (parsed.type) {
      case wsMessageTypes.update:
        setProgress(parsed.payload);
        break;
      case wsMessageTypes.user:
        setIsUserFound(!!parsed.payload);
        break;
      default:
        console.error('unknown message type, message: ', parsed);
    }
  }, []);
  const { sendJsonMessage } = useWebsocket({
    onMessage,
  });

  useEffect(() => {
    if (userSpotifyID) {
      sendJsonMessage({ type: wsMessageTypes.user, payload: userSpotifyID });
    }
  }, [userSpotifyID, sendJsonMessage]);

  return (
    <>
      <Nav setUserSpotifyID={setUserSpotifyID} />
      <CSVUpload userId={userSpotifyID} setCSVFileName={setCSVFileName} />
      <Progress
        progress={progress}
        isUserFound={isUserFound}
        csvFileName={csvFileName}
      />
    </>
  );
};

export default NextAuth;
