import { websocketUrl } from 'config';
import useWebReactUseWebsocket, { ReadyState } from 'react-use-websocket';

interface WebsocketData {
  /**
   * Stringifies websocket message before sending it.
   */
  sendJsonMessage: (message: unknown) => void;
  /**
   * Websocket connection status
   */
  connectionStatus: string;
}

/**
 * Initializes websocket connection to the server.
 */
const useWebsocket = ({
  onMessage,
}: {
  /**
   * message handler which is called when a new message is received.
   */
  onMessage: (event: MessageEvent) => void;
}): WebsocketData => {
  const options = {
    onMessage,
    onError: (error) => {
      console.error('onError', error);
    },
    onClose: (event) => {
      console.info('websocket closing, ', event);
    },
    retryOnError: true,
  };

  const { sendJsonMessage, readyState } = useWebReactUseWebsocket(
    websocketUrl,
    options
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return {
    sendJsonMessage,
    connectionStatus,
  };
};

export default useWebsocket;
