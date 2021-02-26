import React, { useContext } from 'react';
import { Grid, Card } from 'theme';
import { Link, AppContext } from 'components';

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
interface Albums {
  albums?: NewReleasesAlbums;
}

interface Props {
  releases?: Albums;
}

const NewReleases: React.FC<Props> = () => {
  const { newReleases }: { newReleases: Albums } = useContext(AppContext);
  return newReleases?.albums?.items.length ? (
    <>
      <Card fontSize={22} bold pb={16}>
        New Releases
      </Card>
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
            <Card pr={16} pb={16}>
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
    </>
  ) : null;
};

export default NewReleases;
