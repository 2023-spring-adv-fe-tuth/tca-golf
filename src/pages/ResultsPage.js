import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const ResultsPage = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // Retrieve scores from localStorage
    const scoresJson = localStorage.getItem('scores');
    const scoresArray = JSON.parse(scoresJson);
    setScores(scoresArray);
  }, []);

  return (
    <div>
      <h3>Results</h3>
      <table style={{margin: 'auto', border: '1px solid'}}>
        <thead  style={{border: '1px dotted'}}>
          <tr>
            <th>&nbsp;Player&nbsp;&nbsp;</th>
            <th>&nbsp;Total&nbsp;&nbsp;</th>
            <th>&nbsp;Average&nbsp;&nbsp;</th>
            <th>&nbsp;Best Hole&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {scores.map(score => (
            <tr key={score.name}  style={{border: '1px dotted'}}>
              <td>{score.name}</td>
              <td>{score.total}</td>
              <td>{score.avg.toFixed(2)}</td>
              <td>{score.bestHole}</td>
            </tr>
          ))}
        </tbody>
      </table>

    <Link to="../.." relative="path">
      Back to Home
    </Link>
    </div>
  );
};
