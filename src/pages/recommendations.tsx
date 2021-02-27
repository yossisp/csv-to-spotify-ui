import React, { useContext, useEffect, useState } from 'react';
import { Grid, Card, H1, Flex } from 'theme';
import { Link, AppContext, Loader, RecommendationForm } from 'components';
import { WsMessageTypes } from 'types';
import { usePrevious } from 'hooks';

const NOT_FOUND = 'NOT_FOUND';
const EMPTY_INPUT = 'Nothing selected yet';

interface Artist {
  name: string;
}

interface Url {
  spotify: string;
}
interface Track {
  externalUrls: Url;
  artists: Artist[];
}
interface Recommendations {
  tracks: Track[];
}
const Recommendations = () => {
  const [formInput, setFormInput] = useState();
  const {
    isWSConnectionAccepted,
    genres,
    recommendations,
    sendJsonMessage,
    userSpotifyID,
  } = useContext(AppContext);
  const prevFormInput = usePrevious(formInput);

  const recommended: Recommendations & string = recommendations;
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
      formInput &&
      formInput !== prevFormInput
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
        Artist Recommendations
      </H1>
      {genres ? (
        <Flex>
          <Card width={500}>
            <RecommendationForm setFormInput={setFormInput} genres={genres} />
          </Card>
          {!recommended && EMPTY_INPUT}
          {recommended === NOT_FOUND && <Card>not found</Card>}
          {recommended?.tracks && (
            <Grid columns="1fr 1fr" width={500}>
              {recommended.tracks.map((recommendation, index) => {
                const artist = recommendation.artists[0].name;
                return (
                  <Card key={index} pb={16}>
                    <Link external href={recommendation.externalUrls.spotify}>
                      {artist}
                    </Link>
                  </Card>
                );
              })}
            </Grid>
          )}
        </Flex>
      ) : (
        <Loader isLoading={!genres} />
      )}
    </>
  );
};

export default Recommendations;
