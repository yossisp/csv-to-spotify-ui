import React, { useState, createContext, useCallback, useEffect } from 'react';
import { useWebsocket } from 'hooks';
import { WsMessageTypes, JobFinishedStatus } from 'types';

// contains all global state of the application
export const AppContext = createContext(null);

interface ProgressPayload {
  tracksAdded: number;
  tracksNotAdded: number;
}

interface Parsed {
  type: string;
  payload?: any;
}

/**
 * Provides all global state of the application to the children as
 * well as initializes websocket and processes websocket messages.
 * @returns React provider.
 */
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

  /**
   * Parses websocket messages and saves data to state when necessary.
   * @param event websocket event - contains message data.
   */
  const onMessage = useCallback<(event: MessageEvent) => void>(
    (event) => {
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
          if (parsed.payload === JobFinishedStatus.failure) {
            console.log('parsed.payload === JobFinishedStatus.failure');
            addError('Adding tracks to Spotify playlist failed.');
          }
          console.log('parsed', parsed);
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
        case WsMessageTypes.error:
          console.error('error', parsed);
          addError(parsed.payload);
          break;
        default:
          console.error('unknown message type, message: ', parsed);
      }
    },
    [addError]
  );

  const { sendJsonMessage } = useWebsocket({
    onMessage,
  });

  // resets global state
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
    setIsJobFinished(false);
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
