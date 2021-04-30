import NextAuth from 'next-auth';
import { getApiUrl, spotifyScopes, clientId, clientSecret } from 'config';

/**
 * Spotify login options for user.
 */
const options = {
  site: process.env.VERCEL_URL,
  providers: [
    {
      id: 'spotify',
      name: 'Spotify',
      type: 'oauth',
      version: '2.0',
      scope: spotifyScopes,
      params: { grant_type: 'authorization_code' },
      accessTokenUrl: 'https://accounts.spotify.com/api/token',
      authorizationUrl:
        'https://accounts.spotify.com/authorize?response_type=code',
      profileUrl: 'https://api.spotify.com/v1/me',
      clientId,
      clientSecret,
      profile: (profile) => ({
        id: profile.id,
        name: profile.display_name,
        email: profile.email,
        image: profile.images.length > 0 ? profile.images[0].url : undefined,
      }),
    },
  ],
  callbacks: {
    /**
     * The callback is used send Spotify user data to the server,
     * so that the server can perform requests to Spotify API using
     * user tokens.
     * @param session session data
     * @param user Spotify user
     */
    session: async (session, user) => {
      const { refreshToken, accessToken, id: userId } = user.account;
      try {
        await fetch(`${getApiUrl()}/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken, accessToken, userId }),
        });
      } catch (error) {
        console.error(error);
      }
      session.user.id = userId;
      return Promise.resolve(session);
    },
  },
  // The 'database' option should be a connection string or TypeORM
  // configuration object https://typeorm.io/#/connection-options
  //
  // Notes:
  // * You need to install an appropriate node_module for your database!
  // * The email sign in provider requires a database but OAuth providers do not
  database: process.env.DATABASE_URL,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    // jwt: false,
    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
    // Easily add custom properties to response from `/api/auth/session`.
    // Note: This should not return any sensitive information.
    /*
    get: async (session) => {
      session.customSessionProperty = "ABC123"
      return session
    }
    */
  },

  // JSON Web Token options
  jwt: {
    // secret: 'my-secret-123', // Recommended (but auto-generated if not specified)
    // Custom encode/decode functions for signing + encryption can be specified.
    // if you want to override what is in the JWT or how it is signed.
    // encode: async ({ secret, key, token, maxAge }) => {},
    // decode: async ({ secret, key, token, maxAge }) => {},
    // Easily add custom to the JWT. It is updated every time it is accessed.
    // This is encrypted and signed by default and may contain sensitive information
    // as long as a reasonable secret is defined.
    /*
    set: async (token) => {
      token.customJwtProperty = "ABC123"
      return token
    }
    */
  },

  // Control which users / accounts can sign in
  // You can use this option in conjunction with OAuth and JWT to control which
  // accounts can sign in without having to use a database.
  allowSignin: async (user, account) =>
    // Return true if user / account is allowed to sign in.
    // Return false to display an access denied message.
    true,

  // You can define custom pages to override the built-in pages
  // The routes shown here are the default URLs that will be used.
  pages: {
    // signin: '/api/auth/signin',  // Displays signin buttons
    // signout: '/api/auth/signout', // Displays form with sign out button
    // error: '/api/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/api/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Additional options
  // secret: 'abcdef123456789' // Recommended (but auto-generated if not specified)
  // debug: true, // Use this option to enable debug messages in the console
};

const Auth = (req, res) => NextAuth(req, res, options);
export default Auth;
