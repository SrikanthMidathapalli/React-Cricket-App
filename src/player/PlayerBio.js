import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function PlayerBio() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve logged-in user data from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header">
          <h5><b>Player Information</b></h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 text-center">
              <img
                src={process.env.PUBLIC_URL + user.profilePic || 'https://via.placeholder.com/50'}
                alt={`${user.playerName} Profile`}
                className="rounded-circle me-3"
                width="250"
                height="300"
              />
              <h5 className="mt-2">{user.playerName}</h5> {/* Player Name Below the Image */}
            </div>
            <div className="col-md-8">
              <table className="table table-bordered table-striped">
                <thead className="table-info">
                  <tr>
                    <th>Player Name</th>
                    <th>Player Type</th>
                    <th>Player Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{user.playerName}</td>
                    <td>{user.playerType}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                </tbody>
              </table>

              {/* Display the player's game formats */}
              <h5><b>Game Formats</b></h5>
              {user.gameFormats.length > 0 ? (
                <table className="table table-bordered table-striped">
                  <thead className="table-info">
                    <tr>
                      <th>Game Format</th>
                      <th>Runs</th>
                      <th>Wickets</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.gameFormats.map((game, index) => (
                      <tr key={index}>
                        <td>{game.format}</td>
                        <td>{game.runs}</td>
                        <td>{game.wickets}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No game formats found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerBio;
