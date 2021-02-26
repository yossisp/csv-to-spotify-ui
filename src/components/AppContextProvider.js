import React, { useState, createContext, useCallback } from 'react';

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const [newReleases, setNewReleases] = useState();
  const addError = useCallback(
    (error) => setErrors((prevErrors) => [...prevErrors, error]),
    []
  );
  return (
    <AppContext.Provider
      value={{
        errors,
        addError,
        newReleases,
        setNewReleases,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
