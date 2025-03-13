import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPlayers, fetchGameFormats, fetchRoles } from '../api/Api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function PlayerInfo() {
  const [players, setPlayers] = useState([]);
  const [gameFormats, setGameFormats] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [playersRes, formatsRes, rolesRes] = await Promise.all([
          fetchPlayers(),
          fetchGameFormats(),
          fetchRoles()
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

  return (
    <div className="container mt-4">
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="card shadow">
        <div className="card-header">
          <h5><b>All Players Information</b></h5>
        </div>
        <div className="card-body">
          {players.map((plr, index) => (
            <div key={plr.id} className="mb-3">
              <div className="card mb-2">
                <div className="card-body">
                  <img
                    src={process.env.PUBLIC_URL + plr.profilePic || 'https://via.placeholder.com/50'}
                    alt={`${plr.playerName} Profile`}
                    className="rounded-circle me-3"
                    width="50"
                    height="50"
                  />

                  <h5 className="card-title">{plr.playerName}</h5>
                  <table className="table table-bordered table-striped">
                    <thead className="table-info">
                      <tr>
                        <th>Player Name</th>
                        <th>Player Type</th>
                        <th>Player Email</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{plr.playerName}</td>
                        <td>{plr.playerType}</td>
                        <td>{plr.email}</td>
                        <td>{plr.password}</td>
                        <td>{roles.find(role => role.id === plr.roleId)?.role || 'N/A'}</td>
                        <td>
                          <Link to={`/editplayer/${plr.id}`} className="btn btn-primary">Edit</Link>
                          &nbsp;
                          <Link to={`deleteplayer/${plr.id}`} className="btn btn-danger">Delete</Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Accordion for Games Played */}
              <div className="accordion" id={`accordion-${index}`}>
                <div className="accordion-item">
                  <h2 className="accordion-header" id={`heading-${index}`}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${index}`}
                      aria-expanded="false"
                      aria-controls={`collapse-${index}`}
                    >
                      <b>{plr.playerName}'s Games Played</b>
                    </button>
                  </h2>
                  <div
                    id={`collapse-${index}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading-${index}`}
                    data-bs-parent={`#accordion-${index}`}
                  >
                    <div className="accordion-body">
                      <table className="table table-bordered table-striped">
                        <thead className="table-info">
                          <tr>
                            <th>Game Format</th>
                            <th>Runs</th>
                            <th>Wickets</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Filter game formats for this player */}
                          {gameFormats
                            .filter(game => game.playerId === plr.id)
                            .map((game, gameIndex) => (
                              <tr key={gameIndex}>
                                <td>{game.format}</td>
                                <td>{game.runs}</td>
                                <td>{game.wickets}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlayerInfo;
