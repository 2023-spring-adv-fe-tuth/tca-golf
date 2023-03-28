import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

function PlayerEntry() {
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');

  const handleAddPlayer = (event) => {
    event.preventDefault();
    if (newPlayerName.trim() === '') {
      return;
    }
    if (players.find((player) => player.name === newPlayerName.trim())) {
      alert('Player already exists');
      return;
    }

    let selected = false;
    if (players.length < 2) {
      selected = true;
    }

    setPlayers([...players, { name: newPlayerName.trim(), selected }]);
    setNewPlayerName('');

  };

  const handlePlayerSelection = (event, index) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].selected = event.target.checked;
    setPlayers(updatedPlayers);
  };

  const handleRemovePlayer = (index) => {
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
  };

  const handlePlayClick = () => {
    if (players.filter(player => player.selected).length !== 2) {
      alert('Please select 2 players to play');
      return;
    }
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
          variant="outline-primary"
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
      <br/>
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
