import React, { useEffect, useRef, useState, useMemo } from "react";
import { fetchPlayers, fetchGameFormats, fetchRoles } from "../api/Api";

function SearchPlayersBasedOnFormat() {
  const [players, setPlayers] = useState([]);
  const [gameFormats, setGameFormats] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const formatForm = useRef("-1");

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [playersRes, formatsRes, rolesRes] = await Promise.all([
          fetchPlayers(),
          fetchGameFormats(),
          fetchRoles(),
        ]);
        setPlayers(playersRes.data);
        setGameFormats(formatsRes.data);
        setRoles(rolesRes.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const playerInfo = useMemo(() => {
    const selectedFormat = formatForm.current;
    if (selectedFormat === "-1") return [];

    return gameFormats
      .filter((game) => game.format === selectedFormat)
      .map((game) => {
        const matchedPlayer = players.find((player) => player.id === game.playerId);
        return {
          format: game.format,
          runs: game.runs,
          wickets: game.wickets,
          playerName: matchedPlayer ? matchedPlayer.playerName : "Unknown",
          playerType: matchedPlayer ? matchedPlayer.playerType : "Unknown",
        };
      });
  }, [players, gameFormats]);

  const handleFormatChange = (e) => {
    formatForm.current = e.target.value;
  };

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <label className="form-label">Select Cricket Format</label>
          <select className="form-control" ref={formatForm} onChange={handleFormatChange}>
            <option value="-1">Select Format</option>
            <option value="T20">T20</option>
            <option value="Oneday">OneDay</option>
            <option value="Test">Test</option>
          </select>
        </div>
        <div className="col-md-4"></div>
      </div>

      <div className="row">
        <div className="col-lg-1"></div>
        <div className="col-lg-10">
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}

          <table className="table table-bordered table-striped table-hover">
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
                    No players found for the selected format
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

export default SearchPlayersBasedOnFormat;
