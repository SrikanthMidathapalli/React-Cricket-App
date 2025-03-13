import React, { useState, useEffect } from "react";
import axios from "axios";

function PlayerSearchCardView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [players, setPlayers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setPlayers([]);
      setShowResults(false);
      return;
    }

    const fetchPlayer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/Player?playerName_like=${searchTerm}`
        );
        setPlayers(response.data);
        setShowResults(true);
      } catch (error) {
        console.error("Error fetching player", error);
      }
    };

    fetchPlayer();
  }, [searchTerm]);

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Search Player by Name</h3>

      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <input
            type="text"
            placeholder="Type player name..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        {showResults && players.length === 0 && (
          <p className="text-center text-danger">No player found with that name.</p>
        )}

        {players.map((player) => (
          <div className="col-md-4 mb-4" key={player.id}>
            <div className="card shadow border-0 h-100">
              <div className="card-body">
                <h5 className="card-title">{player.playerName}</h5>
                <p className="card-text">
                  <strong>Type:</strong> {player.playerType} <br />
                  <strong>Email:</strong> {player.email} <br />
                  <strong>Role ID:</strong> {player.roleId}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayerSearchCardView;
