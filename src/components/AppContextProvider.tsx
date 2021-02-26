import React, { useState, createContext, useCallback, useEffect } from 'react';
import { useWebsocket } from 'hooks';
import { WsMessageTypes } from 'types';

export const AppContext = createContext(null);

interface ProgressPayload {
  tracksAdded: number;
  tracksNotAdded: number;
}

interface Parsed {
  type: string;
  payload?: any;
}

const AppContextProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const [userSpotifyID, setUserSpotifyID] = useState<string | null>(null);
  const [isUserFound, setIsUserFound] = useState<boolean | null>(null);
  const [progress, setProgress] = useState<ProgressPayload | null>(null);
  const [csvFileName, setCSVFileName] = useState();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [newReleases, setNewReleases] = useState();
  const addError = useCallback(
    (error) => setErrors((prevErrors) => [...prevErrors, error]),
    []
  );

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
      case WsMessageTypes.newReleases:
        const releases = JSON.parse(parsed.payload);
        setNewReleases(releases);
        console.log('releases', releases);
        break;
      case WsMessageTypes.recommendations:
        const recommendations = JSON.parse(parsed.payload);
        console.log('recommendations', recommendations);
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
    <AppContext.Provider
      value={{
        errors,
        addError,
        newReleases,
        setNewReleases,
        userSpotifyID,
        setUserSpotifyID,
        csvFileName,
        setCSVFileName,
        progress,
        isUserFound,
        isModalOpen,
        setIsModalOpen,
        sendJsonMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
