import axios from "axios";
import React, { useEffect, useState } from "react";

function SearchPlayersBasedOnType() {
  const [playerType, setPlayerType] = useState(""); // Controlled input
  const [players, setPlayers] = useState([]);
  const [formats, setFormats] = useState([]);
  const [playerInfo, setPlayerInfo] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all players and formats
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [playerRes, formatRes] = await Promise.all([
          axios.get("http://localhost:3000/Player"),
          axios.get("http://localhost:3000/GameFormat"),
        ]);
        setPlayers(playerRes.data);
        setFormats(formatRes.data);
      } catch (err) {
        console.error(err);
        setError("Error fetching data.");
      }
    };
    fetchData();
  }, []);

  // Handler for search/filtering
  const handleSearch = () => {
    if (!playerType.trim()) {
      alert("Please enter a player type.");
      return;
    }

    const validTypes = ["Batsman", "Bowler", "All-Rounder", "Wkt-Keeper"];
    if (!validTypes.includes(playerType.trim())) {
      alert("Invalid player type entered.");
      return;
    }

    const filtered = [];

    players.forEach((player) => {
      if (player.playerType === playerType.trim()) {
        const playerFormats = formats.filter((f) => f.playerID === player.id);

        playerFormats.forEach((format) => {
          filtered.push({
            pname: player.playerName,
            ptype: player.playerType,
            format: format.format,
            runs: format.runs,
            wickets: format.wickets,
          });
        });
      }
    });

    setPlayerInfo(filtered);
  };

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <label className="form-label">Enter Player Type</label>
          <input
            type="text"
            value={playerType}
            onChange={(e) => setPlayerType(e.target.value)}
            className="form-control"
            placeholder="e.g., Batsman, Bowler"
          />
          <small className="text-muted">
            (Batsman, Bowler, All-Rounder, Wkt-Keeper)
          </small>
        </div>
        <div className="col-md-4 d-flex align-items-end">
          <button className="btn btn-success" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {error && <p className="text-danger">{error}</p>}

      <div className="row">
        <div className="col-lg-1"></div>
        <div className="col-lg-10">
          <table className="table table-bordered table-hover table-striped">
            <thead className="table-info">
              <tr>
                <th>Player Name</th>
                <th>Player Format</th>
                <th>Player Type</th>
                <th>Player Runs</th>
                <th>Player Wickets</th>
              </tr>
            </thead>
            <tbody>
              {playerInfo.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No players found.
                  </td>
                </tr>
              ) : (
                playerInfo.map((p, index) => (
                  <tr key={index}>
                    <td>{p.playerName}</td>
                    <td>{p.format}</td>
                    <td>{p.playerType}</td>
                    <td>{p.runs}</td>
                    <td>{p.wickets}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="col-lg-1"></div>
      </div>
    </div>
  );
}

export default SearchPlayersBasedOnType;
