import React, { useContext, useEffect, useState } from 'react';
import { Card, Span } from 'theme';
import { AppContext } from 'components';
import { apiUrl } from 'config';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import { withAuth } from 'hocs';

const HeaderCell = styled(Span)`
  font-weight: bold;
  font-size: 16px;
`;

enum Status {
  success = 'SUCCESS',
}

interface UserStats {
  id: number;
  name: string;
  status: Status;
  tracksAdded: number;
  date: string;
}

/**
 * The page displays user-related data.
 * @returns React component.
 */
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
    <Card width={600}>
      <TableContainer component={Paper}>
        <Table aria-label="User Stats Table">
          <TableHead>
            <TableRow>
              <TableCell>
                <HeaderCell>Date</HeaderCell>{' '}
              </TableCell>
              <TableCell>
                <HeaderCell>Playlist Name</HeaderCell>{' '}
              </TableCell>
              <TableCell align="right">
                <HeaderCell>Status</HeaderCell>{' '}
              </TableCell>
              <TableCell align="right">
                <HeaderCell>Total Tracks Added</HeaderCell>{' '}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userStats.map((stat) => {
              return (
                <TableRow key={stat.id}>
                  <TableCell component="th" scope="row">
                    {new Date(stat.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {stat.name}
                  </TableCell>
                  <TableCell align="right">{stat.status}</TableCell>
                  <TableCell align="right">{stat.tracksAdded}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  ) : (
    <Card fontSize={18} bold>
      No activity to display.
    </Card>
  );
};

export default withAuth(Account);
