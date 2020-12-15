import { websocketUrl } from 'config';
import useWebReactUseWebsocket, { ReadyState } from 'react-use-websocket';

const useWebsocket = ({ onMessage }) => {
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
