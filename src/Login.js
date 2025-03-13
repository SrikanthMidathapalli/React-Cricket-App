import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const user = useRef("");
  const pwd = useRef("");

  const [players, setPlayers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [gameFormats, setGameFormats] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // Fetch Player, Role, and GameFormat data
  useEffect(() => {
    axios.get("http://localhost:3000/Player")
      .then((response) => setPlayers(response.data))
      .catch((err) => alert("Player fetch error: " + err));

    axios.get("http://localhost:3000/Role")
      .then((response) => setRoles(response.data))
      .catch((err) => alert("Role fetch error: " + err));

    axios.get("http://localhost:3000/GameFormat")
      .then((response) => setGameFormats(response.data))
      .catch((err) => alert("GameFormat fetch error: " + err));
  }, []);

  const LoginFun = (e) => {
    e.preventDefault();
    const uname = user.current.value;
    const pswd = pwd.current.value;

    // Check if user exists in Player list
    const matchedPlayer = players.find(
      (p) => p.email === uname && p.password === pswd
    );

    if (matchedPlayer) {
      const matchedRole = roles.find((r) => r.id === matchedPlayer.roleId);

      // Get the player's game formats
      const playerGameFormats = gameFormats.filter(
        (g) => g.playerId === matchedPlayer.id
      );

      if (matchedRole) {
        // Store all relevant user details in localStorage
        const loggedInUser = {
          id: matchedPlayer.id,
          playerName: matchedPlayer.playerName,
          email: matchedPlayer.email,
          role: matchedRole.role,
          profilePic: matchedPlayer.profilePic,
          playerType: matchedPlayer.playerType,
          gameFormats: playerGameFormats, // Store associated game formats
        };

        // Store the logged-in user data in localStorage
        localStorage.setItem("user", JSON.stringify(loggedInUser));

        // Set login status and navigate based on role
        if (matchedRole.role === "Admin") {
          props.setLoginstatus("admin");
          navigate("/viewplayers");
        } else {
          props.setLoginstatus("player");
          navigate("/player");
        }
      }
    } else {
      setMsg("Error: Invalid Username or Password");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-light text-center text-dark">
              <h3>Login</h3>
            </div>
            <div className="card-body bg-light">
              <form onSubmit={LoginFun}>
                <div className="mb-4">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    name="user"
                    className="form-control form-control-lg"
                    ref={user}
                    required
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="pswd"
                    className="form-control form-control-lg"
                    ref={pwd}
                    required
                    placeholder="Enter your password"
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100"
                  >
                    Login
                  </button>
                </div>
              </form>
              {msg && <p className="mt-3 text-danger text-center">{msg}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
