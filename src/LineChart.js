import { Chart } from "react-google-charts";
import { Card } from 'react-bootstrap';

export function LineChart({ leaderboard }) {
    const scoresJson = localStorage.getItem('scores');
    const scoresArray = JSON.parse(scoresJson) ?? []; // use empty array if null or undefined
  
    const topPlayer = leaderboard[0]?.name; // get name of player at #1 spot on leaderboard
  
    const playerScores = scoresArray.filter(score => score.name === topPlayer);
  
    const chartData = [['Game', 'Total Score Per Game'], ...playerScores.map((score, index) => [index + 1, score.total])];
  
    return (
      <Card id="LeaderBoard">
        <Card.Header>Best Player's Perfomance</Card.Header>
        <Card.Body>
          <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={chartData}
            options={{
                title: topPlayer,
              hAxis: {
                title: 'Games'
              },
              vAxis: {
                title: 'Score'
              },
              legend: { position: 'bottom' }
            }}
          />
        </Card.Body>
      </Card>
    );
  }
  