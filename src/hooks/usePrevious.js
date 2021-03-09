import { useRef, useEffect } from 'react';

/**
 * Saves previous value of some value (usually the value comes from state).
 * This allows to check if state has changed in certain cases.
 * @param value - some value
 * @returns - previous value
 */
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default usePrevious;
