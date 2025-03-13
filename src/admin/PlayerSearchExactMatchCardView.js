import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function PlayerSearchExactMatchCardView() {
  const location = useLocation(); // 👉 Observe actual changes in the URL
  const query = new URLSearchParams(location.search);
  const searchParam = query.get("name") || "";

  const [players, setPlayers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // ✅ Trigger search every time query param changes
  useEffect(() => {
    if (searchParam.trim() !== "") {
      handleSearch(searchParam);
    } else {
      // Clear players list when query is cleared
      setPlayers([]);
      setShowResults(false);
    }
  }, [searchParam]); // <-- this now tracks URL param directly

  const handleSearch = async (term) => {
    if (term.trim() === "") {
      setPlayers([]);
      setShowResults(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/Player");
      const allPlayers = response.data;

      const matchedPlayers = allPlayers.filter(
        (player) =>
          player.playerName.toLowerCase() === term.trim().toLowerCase()
      );

      setPlayers(matchedPlayers);
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching player", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        {showResults && players.length === 0 && (
          <p className="text-center text-danger">No player found with that name.</p>
        )}

        {players.map((player) => (
          <div className="col-md-4 mb-4" key={player.id}>
            <div className="card shadow border-0 h-100 text-center">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">Player Details</h5>
                <p className="card-text">
                  <strong>Name:</strong>{player.playerName} <br />
                  <strong>Type:</strong> {player.playerType} <br />
                  <strong>Email:</strong> {player.email} <br />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayerSearchExactMatchCardView;
