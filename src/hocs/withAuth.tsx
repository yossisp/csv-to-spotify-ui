import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { constants } from 'helpers';
import { useSession } from 'next-auth/client';

const withAuth = (Component) => {
  return (props) => {
    const [session] = useSession();
    const router = useRouter();
    useEffect(() => {
      if (!session && router.pathname !== constants.NAV.HOME) {
        router.push(constants.NAV.HOME);
      }
    }, [router, session]);
    return session ? <Component {...props} /> : null;
  };
};

export default withAuth;
