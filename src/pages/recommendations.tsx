import React, { useContext, useEffect, useState } from 'react';
import { Grid, Card, H1 } from 'theme';
import { Link, AppContext, Loader, RecommendationForm } from 'components';
import { WsMessageTypes } from 'types';

const Recommendations = () => {
  const [formInput, setFormInput] = useState();
  const {
    isWSConnectionAccepted,
    genres,
    recommendations,
    sendJsonMessage,
    userSpotifyID,
  } = useContext(AppContext);
  console.log('formInput', formInput);
  useEffect(() => {
    if (isWSConnectionAccepted && !genres && userSpotifyID) {
      sendJsonMessage({
        type: WsMessageTypes.genres,
        payload: userSpotifyID,
      });
    }

    if (
      isWSConnectionAccepted &&
      userSpotifyID &&
      !recommendations &&
      formInput
    ) {
      sendJsonMessage({
        type: WsMessageTypes.recommendations,
        payload: {
          user: userSpotifyID,
          recommendations: formInput,
        },
      });
    }
  }, [
    sendJsonMessage,
    userSpotifyID,
    genres,
    isWSConnectionAccepted,
    recommendations,
    formInput,
  ]);

  return (
    <>
      <H1 fontSize={22} bold pb={16}>
        Recommendations
      </H1>
      {genres ? (
        <RecommendationForm setFormInput={setFormInput} genres={genres} />
      ) : (
        <Loader isLoading={!genres} />
      )}
    </>
  );
};

export default Recommendations;
