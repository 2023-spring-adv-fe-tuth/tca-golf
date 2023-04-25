import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

export const PlayPage = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const players = JSON.parse(decodeURIComponent(searchParams.get('players')));

  const [scores, setScores] = useState(players.map(player => ({ name: player.name, scores: Array(9).fill('') })));

  const navigate = useNavigate();

  const HandleScoreSubmit = (event) => {
    event.preventDefault();
    
    // Calculate scores and averages
    const updatedScores = scores.map(playerScore => {
      const playerTotal = playerScore.scores.reduce((total, score) => total + Number(score), 0);
      const playerAvg = playerTotal / playerScore.scores.length;
      const playerBestHole = Math.min(...playerScore.scores.map(score => Number(score)));

      return {
        ...playerScore,
        total: playerTotal,
        avg: playerAvg,
        bestHole: playerBestHole
      };
    });
    
    // Store scores
    localStorage.setItem('scores', JSON.stringify(updatedScores));
    
    // Navigate to results page
    navigate('/results');

    
  };

  const holeNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <div>
        <h1>Play Golf!</h1>
        <br/>
      <form onSubmit={HandleScoreSubmit}>
        <table style={{margin: "auto"}}>
          <thead>
            <tr>
              <th>Holes</th>
              {players.map(player => <th key={player.name} >{player.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 9 }, (_, index) => (
              <tr key={index}>
                <td>{holeNames[index]}</td>
                {players.map(player => (
                  <td key={player.name}>
                    <input type="number" min="-6" max="60" value={scores.find(score => score.name === player.name).scores[index]} onChange={(event) => {
                      const updatedScores = [...scores];
                      const playerScores = updatedScores.find(score => score.name === player.name).scores;
                      playerScores[index] = event.target.value;
                      setScores(updatedScores);
                    }} ></input>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <Button 
          type="submit"
          >
            Submit Scores
          </Button>
      </form>
    </div>
  );
}

