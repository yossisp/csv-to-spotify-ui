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
  const [csvFileName, setCSVFileName] = useState<string | null>(null);
  const [isJobFinished, setIsJobFinished] = useState<boolean>(false);
  const [newReleases, setNewReleases] = useState(null);
  const [isWSConnectionAccepted, setIsWSConnectionAccepted] = useState<boolean>(
    false
  );
  const [genres, setGenres] = useState(null);
  const [recommendations, setRecommendations] = useState();
  const addError = useCallback(
    (error) => setErrors((prevErrors) => [...prevErrors, error]),
    []
  );

  const onMessage = useCallback<(event: MessageEvent) => void>((event) => {
    const parsed: Parsed = JSON.parse(event.data);
    switch (parsed.type) {
      case WsMessageTypes.accepted:
        setIsWSConnectionAccepted(true);
        break;
      case WsMessageTypes.update:
        setProgress(parsed.payload);
        break;
      case WsMessageTypes.user:
        setIsUserFound(!!parsed.payload);
        break;
      case WsMessageTypes.jobFinished:
        setIsJobFinished(true);
        break;
      case WsMessageTypes.newReleases:
        const releases = JSON.parse(parsed.payload);
        setNewReleases(releases);
        console.log('releases', releases);
        break;
      case WsMessageTypes.recommendations:
        const recommendations = JSON.parse(parsed.payload);
        setRecommendations(recommendations);
        console.log('recommendations', recommendations);
        break;
      case WsMessageTypes.genres:
        const genres = JSON.parse(parsed.payload);
        setGenres(genres);
        console.log('genres', genres);
        break;
      default:
        console.error('unknown message type, message: ', parsed);
    }
  }, []);
  const { sendJsonMessage } = useWebsocket({
    onMessage,
  });

  const cleanUp = () => {
    setErrors([]);
    setUserSpotifyID(null);
    setIsUserFound(null);
    setProgress(null);
    setCSVFileName(null);
    setNewReleases(null);
    setIsWSConnectionAccepted(false);
    setGenres(null);
    setRecommendations(null);
  };

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
        sendJsonMessage,
        recommendations,
        genres,
        isWSConnectionAccepted,
        cleanUp,
        isJobFinished,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
