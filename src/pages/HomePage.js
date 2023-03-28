import { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import PlayerEntry from '../playerEntry';

export const HomePage = () => {
    const [leaderboard, setLeaderboard] = useState([]);
  
    useEffect(() => {
      // Retrieve scores from localStorage
      const scoresJson = localStorage.getItem('scores');
      const scoresArray = JSON.parse(scoresJson);
  
      // Create leaderboard from scores
      const leaderboard = scoresArray?.reduce((acc, score) => {
        const player = acc.find(p => p.name === score.name);
        if (player) {
          player.gamesPlayed++;
          player.total += score.total;
          player.bestScore = Math.min(player.bestScore, score.total);
        } else {
          acc.push({
            name: score.name,
            gamesPlayed: + 1,
            total: score.total,
            average: score.total,
            bestScore: score.total,
          });
        }
        return acc;
      }, []);
  
      // Calculate averages
      leaderboard.forEach(p => {
        p.average = p.total / p.gamesPlayed;
      });
  
      // Sort leaderboard by average score and best score
      if (leaderboard) {
        leaderboard.sort((a, b) => {
          if (a.average === b.average) {
            return a.bestScore - b.bestScore;
          }
          return b.average - a.average;
        });
      }
  
      setLeaderboard(leaderboard);
    }, []);
  
    return (
      <>
        <h1>TCA Golf Companion App</h1>
        <br />
        <PlayerEntry />
  
        <Card className="mt-3">
          <Card.Header>Leaderboard</Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Games Played</th>
                  <th>Average Score</th>
                  <th>Best Score</th>

                </tr>
              </thead>
              <tbody>
                {leaderboard.slice(0, 5).map((player, index) => (
                  <tr key={player.name}>
                    <td>{index + 1}</td>
                    <td>{player.name}</td>
                    <td>{player.gamesPlayed}</td>
                    <td>{player.average.toFixed(2)}</td>
                    <td>{player.bestScore}</td>

                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </>
    );
  };
  
  