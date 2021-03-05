import React, { useContext, useEffect, useState } from 'react';
import { Grid, Card, H1, Flex } from 'theme';
import { Link, AppContext, Loader, RecommendationForm } from 'components';
import { WsMessageTypes } from 'types';
import { usePrevious } from 'hooks';
import { withAuth } from 'hocs';

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
interface RecommendationsData {
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
  const recommended: RecommendationsData & string = recommendations;
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
    prevFormInput,
  ]);

  return (
    <>
      <H1 isAnimated pb={16}>
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

export default withAuth(Recommendations);
