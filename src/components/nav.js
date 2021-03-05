import React, { useEffect, useContext } from 'react';
import { signin, signout, useSession } from 'next-auth/client';
import { AppContext, Menu } from 'components';
import { Card, ButtonMui } from 'theme';

const Nav = () => {
  const { setUserSpotifyID } = useContext(AppContext);
  const [session, loading] = useSession();

  useEffect(() => {
    const userSpotifyID = session?.user?.id;
    if (session?.errorMessage) {
      console.error('session.errorMessage: ', session.errorMessage);
    }
    if (userSpotifyID) {
      setUserSpotifyID(userSpotifyID);
    }
  }, [session, setUserSpotifyID]);

  return (
    <Card width={400} pb={50} pt={20}>
      <nav>
        <noscript>
          <style>{'.nojs-show { opacity: 1; top: 0; }'}</style>
        </noscript>
        <div>
          {!session && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Menu />
              <span>Not signed in</span>
              <a
                href="/api/auth/signin"
                onClick={(e) => {
                  e.preventDefault();
                  signin();
                }}
              >
                <ButtonMui color="secondary">Sign in</ButtonMui>
              </a>
            </div>
          )}
          {session && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Menu />
              <span>
                Signed in as <strong>{session.user.name}</strong>
              </span>
              <a
                href="/api/auth/signout"
                onClick={(e) => {
                  e.preventDefault();
                  signout();
                }}
                style={{ textDecoration: 'none' }}
              >
                <ButtonMui color="secondary">Sign out</ButtonMui>
              </a>
            </div>
          )}
        </div>
      </nav>
    </Card>
  );
};

export default Nav;
