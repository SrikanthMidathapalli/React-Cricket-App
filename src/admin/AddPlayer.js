import React, { useState } from "react";
import axios from "axios";

function AddPlayer() {
    const [player, setPlayer] = useState({
        id: "",
        playerName: "",
        playerType: "",
        email: "",
        password: "",  
        roleId: "",     
        profilePic: "",
    });

    const AddPlayerInfo = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:3000/Player', player)
            .then((response) => {
                setPlayer(response.data);
                alert("Data is Added: " + response.data);
            })
            .catch((err) => {
                console.error(err);
                alert("Error: " + err);
            });
    };

    return (
        <div>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <b>Player Information</b>
                        </div>
                        <div className="card-body">
                            <form method="post" onSubmit={AddPlayerInfo}>
                                <label>Player ID</label>
                                <input
                                    type="text"
                                    name="id"
                                    className="form-control"
                                    value={player.id}
                                    onChange={(e) =>
                                        setPlayer({ ...player, id: e.target.value })
                                    }
                                />

                                <br />
                                <label>Player Name</label>
                                <input
                                    type="text"
                                    name="playerName"
                                    className="form-control"
                                    value={player.playerName}
                                    onChange={(e) =>
                                        setPlayer({ ...player, playerName: e.target.value })
                                    }
                                />

                                <br />
                                <label>Player Type</label>
                                <select
                                    className="form-control"
                                    value={player.playerType}
                                    onChange={(e) =>
                                        setPlayer({ ...player, playerType: e.target.value })
                                    }
                                >
                                    <option value="-1">Pick Player Type</option>
                                    <option value="Batsman">Batsman</option>
                                    <option value="Bowler">Bowler</option>
                                    <option value="All-Rounder">All-Rounder</option>
                                    <option value="Wkt-Keeper">Wkt-Keeper</option>
                                </select>
                                <br />
                                <label>Player Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={player.email}
                                    onChange={(e) =>
                                        setPlayer({ ...player, email: e.target.value })
                                    }
                                />

                                <br />
                                <label>Email Password</label>
                                <input
                                    type="text"
                                    name="password"  // Corrected to match JSON structure
                                    className="form-control"
                                    value={player.password}
                                    onChange={(e) =>
                                        setPlayer({ ...player, password: e.target.value })
                                    }
                                />

                                <br />
                                <label>Role ID</label>
                                <input
                                    type="text"
                                    name="roleId"  
                                    className="form-control"
                                    value={player.roleId}
                                    onChange={(e) =>
                                        setPlayer({ ...player, roleId: e.target.value })
                                    }
                                />

                                <br />
                                <input type="submit" value="Add Player" className="btn btn-success" />
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    );
}

export default AddPlayer;
