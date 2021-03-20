import React, { useContext, useEffect } from 'react';
import { Grid, Card, H1 } from 'theme';
import { Link, AppContext, Loader } from 'components';
import { WsMessageTypes } from 'types';
import { withAuth } from 'hocs';

interface ExternalUrl {
  spotify: string;
}

interface Artist {
  name: string;
}
interface Image {
  width: string | number;
  url: string;
}
interface Release {
  name: string;
  externalUrls: ExternalUrl;
  artists: Artist[];
  images: Image[];
}
interface NewReleasesAlbums {
  items: Release[];
}
interface Releases {
  albums?: NewReleasesAlbums;
}

/**
 * Displays new releases.
 * @returns React component.
 */
const NewReleases: React.FC = () => {
  const appContext = useContext(AppContext);
  const { newReleases }: { newReleases: Releases } = appContext;
  const { sendJsonMessage, userSpotifyID, isWSConnectionAccepted } = appContext;

  useEffect(() => {
    if (userSpotifyID && isWSConnectionAccepted) {
      sendJsonMessage({
        type: WsMessageTypes.newReleases,
        payload: userSpotifyID,
      });
    }
  }, [sendJsonMessage, userSpotifyID, isWSConnectionAccepted]);
  return (
    <>
      <H1 pb={16} isAnimated>
        New Releases
      </H1>
      {newReleases?.albums?.items.length ? (
        <Grid>
          {newReleases.albums.items.map((item: Release) => {
            const image =
              item.images.length > 1
                ? item.images
                    .map((image) => {
                      image.width = Number(image.width);
                      return image;
                    })
                    .sort((a, b) => a.width - b.width)[1]
                : item.images[0];
            return (
              <Card pr={16} pb={16} key={item.name}>
                <Link href={item.externalUrls.spotify} external>
                  <>
                    <img src={image.url} alt={item.name} />
                    <Card fontSize={16} bold>
                      {item.artists.map(({ name }) => name).join()}
                    </Card>
                  </>
                </Link>
              </Card>
            );
          })}
        </Grid>
      ) : (
        <Loader isLoading={newReleases?.albums?.items.length} />
      )}
    </>
  );
};

export default withAuth(NewReleases);
