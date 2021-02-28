import React, { useContext, useEffect, useState } from 'react';
import { Grid, Card, H1, Flex, Span } from 'theme';
import { Link, AppContext, Loader, RecommendationForm } from 'components';
import { WsMessageTypes } from 'types';
import { usePrevious } from 'hooks';
import { apiUrl } from 'config';

enum Status {
  success = 'SUCCESS',
}

interface UserStats {
  id: number;
  name: string;
  status: Status;
  tracksAdded: number;
}

const Account = () => {
  const [userStats, setUserStats] = useState<UserStats[]>([]);
  const { userSpotifyID } = useContext(AppContext);
  useEffect(() => {
    (async function getUserStats() {
      try {
        if (userSpotifyID && !userStats.length) {
          const response = await fetch(`${apiUrl}/userstats`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: userSpotifyID }),
          });
          const userStats = await response.json();
          console.log('userStats', userStats);
          setUserStats(userStats);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [userSpotifyID, userStats.length]);

  return userStats.length ? (
    <Flex column>
      {userStats.map((stat) => (
        <Flex key={stat.id}>
          <Span pb={16} pr={16}>
            Playlist Name: <Span>{stat.name}</Span>
          </Span>
          <Span pb={16} pr={16}>
            Status: <Span>{stat.status}</Span>
          </Span>
          <Span pb={16} pr={16}>
            Tracks Added: <Span>{stat.tracksAdded}</Span>
          </Span>
        </Flex>
      ))}
    </Flex>
  ) : null;
};

export default Account;
