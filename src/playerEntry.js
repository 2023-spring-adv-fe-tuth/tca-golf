import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

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
    setPlayers([...players, { name: newPlayerName.trim(), selected: false }]);
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

  const nav = useNavigate();

  return (
    <div>
      <form onSubmit={handleAddPlayer}>
        <input
          type="text"
          value={newPlayerName}
          onChange={(event) => setNewPlayerName(event.target.value)}
          placeholder="Enter player name"
        />
        <Button 
          size="sm"
          variant="outline-primary"
          type="submit">Add Player</Button>
      </form>
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
      <br /><br />
      <Button
        type='submit'
        variant="success"
        size="lg"
        onClick={() => nav("/play")}
        disabled={players.filter((player) => player.selected).length !== 2}>
        Play!
      </Button>
    </div>
  );
}

export default PlayerEntry;
