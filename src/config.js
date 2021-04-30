export const ssrApiUrl = process.env.NEXT_PUBLIC_API_URL_SSR;
export const clientSideApiUrl = process.env.NEXT_PUBLIC_API_URL_CLIENT;
export const websocketUrl = process.env.NEXT_PUBLIC_WS_URL;
export const spotifyScopes = process.env.SPOTIFY_SCOPES;
export const clientId = process.env.SPOTIFY_CLIENT_ID;
export const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
export const siteUrl = process.env.NEXT_PUBLIC_SITE;
export const getApiUrl = () => {
  let url;
  if (typeof window === 'undefined') {
    url = ssrApiUrl;
  } else {
    url = clientSideApiUrl;
  }
  return url;
};
