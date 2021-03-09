import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { constants } from 'helpers';
import { useSession } from 'next-auth/client';

/**
 * The higher order component ensures that only a logged in
 * user can access a given page. If a non-logged in user
 * tries access a page they're redirected to homepage.
 * @param Page React component
 * @returns React component
 */
const withAuth = (Page) => {
  return (props) => {
    const [session] = useSession();
    const router = useRouter();
    useEffect(() => {
      if (!session && router.pathname !== constants.NAV.HOME) {
        router.push(constants.NAV.HOME);
      }
    }, [router, session]);
    return session ? <Page {...props} /> : null;
  };
};

export default withAuth;
