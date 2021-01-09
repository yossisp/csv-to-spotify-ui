import React, { useState, useEffect, useCallback } from 'react';
import { Progress, Nav, CSVUpload, Modal } from 'components';
import { useWebsocket } from 'hooks';
import { Flex } from 'theme';

enum WsMessageTypes {
  update = 'UPDATE',
  jobFinished = 'JOB_FINISHED',
  user = 'USER',
}

interface ProgressPayload {
  trackAdded: number;
  tracksNotAdded: number;
}

interface Parsed {
  type: string;
  payload?: any;
}

const NextAuth: React.FC<{}> = () => {
  const [userSpotifyID, setUserSpotifyID] = useState<string | null>(null);
  const [isUserFound, setIsUserFound] = useState<boolean | null>(null);
  const [progress, setProgress] = useState<ProgressPayload | null>(null);
  const [csvFileName, setCSVFileName] = useState();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const onMessage = useCallback<(event: MessageEvent) => void>((event) => {
    const parsed: Parsed = JSON.parse(event.data);
    switch (parsed.type) {
      case WsMessageTypes.update:
        setProgress(parsed.payload);
        break;
      case WsMessageTypes.user:
        setIsUserFound(!!parsed.payload);
        break;
      case WsMessageTypes.jobFinished:
        setIsModalOpen(true);
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
      sendJsonMessage({ type: WsMessageTypes.user, payload: userSpotifyID });
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
      {isModalOpen && (
        <Modal close={() => setIsModalOpen(false)}>
          <Flex column center p={64} backgroundColor="white">
            The job has finished!
          </Flex>
        </Modal>
      )}
    </>
  );
};

export default NextAuth;
