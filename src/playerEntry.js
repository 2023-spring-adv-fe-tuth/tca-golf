import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

function PlayerEntry() {
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [scores, setScores] = useState([]);

  // Retrieve previous players/scores
useEffect(() => {
  const scoresJson = localStorage.getItem('scores');
  const scoresArray = JSON.parse(scoresJson);
  setScores(scoresArray);

   // Add previous players to the players list
  const previousPlayers = scoresArray.map((score) => ({
    name: score.name,
    selected: false
  }));
  setPlayers(previousPlayers);
}, []);


// Adds player and checks for duplicates
  const handleAddPlayer = (event) => {
    event.preventDefault();
    if (newPlayerName.trim() === '') {
      return;
    }
    if (players.find((player) => player.name === newPlayerName.trim())) {
      alert('Player already exists');
      return;
    }

    // Auto selects players, after two players have been added auto-select will disengage
    let selected = false;
    if (players.length < 2) {
      selected = true;
    }

    setPlayers([...players, { name: newPlayerName.trim(), selected }]);
    setNewPlayerName('');

  };

  // player selection
  const handlePlayerSelection = (event, index) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].selected = event.target.checked;
    setPlayers(updatedPlayers);
  };

  // remove player if needed
  const handleRemovePlayer = (index) => {
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
  };

  // Makes sure two players are selected before games starts
  const handlePlayClick = () => {
    nav(`/play?players=${encodeURIComponent(JSON.stringify(players.filter(player => player.selected)))}`);
  };
 

  const nav = useNavigate();

  return (
    <div>
      <Form
        onSubmit={handleAddPlayer}
        >
        <input
          type="text"
          value={newPlayerName}
          onChange={(event) => setNewPlayerName(event.target.value)}
          placeholder="Enter player name"
        />
        <Button 
          style={{verticalAlign: 'top'}}
          size="sm"
          variant="outline-success"
          type="submit">Add Player</Button>
      </Form>
      <br/>
      <p style={{textDecoration: 'underline', fontWeight: 'bold'}}>Player List:</p>
      <ul style={{ listStyleType: 'none' }}>
        {players.map((player, index) => (
          <li key={player.name}>
            <input
              type="checkbox"
              checked={player.selected}
              onChange={(event) => handlePlayerSelection(event, index)}
            />
            {player.name}


            
            <Button 
              style={{padding: '2px', verticalAlign: 'top', marginLeft:"10px", }}
              size="sm"
              type="button"
              variant="outline-danger"
              onClick={() => handleRemovePlayer(index)}
              >
              Remove
            </Button>
          </li>
        ))}
        
      </ul>
      <Button
        type='submit'
        variant="success"
        size="lg"
        disabled={players.filter(player => player.selected).length !== 2}
        onClick={handlePlayClick}>
        Play!
      </Button>
    </div>
  );
}

export default PlayerEntry;
