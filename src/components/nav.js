import React, { useEffect, useContext } from 'react';
import { signin, signout, useSession } from 'next-auth/client';
import { AppContext, Menu } from 'components';
import { Card, ButtonMui, Span, Flex } from 'theme';

/**
 * Navigation component which contains the menu and sign out button.
 * @returns React component
 */
const Nav = () => {
  const { setUserSpotifyID, cleanUp, addError } = useContext(AppContext);
  const [session, loading] = useSession();

  useEffect(() => {
    const userSpotifyID = session?.user?.id;
    if (session?.errorMessage) {
      addError(session.errorMessage);
    }
    if (userSpotifyID) {
      setUserSpotifyID(userSpotifyID);
    }
  }, [session, setUserSpotifyID, addError]);

  return (
    <Card pb={50} pt={20}>
      <nav>
        <noscript>
          <style>{'.nojs-show { opacity: 1; top: 0; }'}</style>
        </noscript>
        <div>
          {!session && !loading && (
            <Flex
              position="absolute"
              justifyContent="center"
              alignItems="center"
              top={0}
              bottom={0}
              left={0}
              right={0}
            >
              <a
                href="/api/auth/signin"
                onClick={(e) => {
                  e.preventDefault();
                  signin();
                }}
                style={{ textDecoration: 'none' }}
              >
                <ButtonMui color="secondary">
                  <Span fontSize={18}>Sign in</Span>
                </ButtonMui>
              </a>
            </Flex>
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
              <ButtonMui
                onClick={() => {
                  cleanUp();
                  signout({ redirect: false, callbackUrl: '/' });
                }}
                color="secondary"
              >
                Sign out
              </ButtonMui>
            </div>
          )}
        </div>
      </nav>
    </Card>
  );
};

export default Nav;
