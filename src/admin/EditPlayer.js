import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditPlayer() {
    const [player, setPlayer] = useState({
        id: "",
        playerName: "",
        playerType: "",
        email: "",
        password: "",
        roleId: "",
        profilePic: "",
    });

    const { id } = useParams(); 
    const navigate = useNavigate(); 

    useEffect(() => {
        axios
            .get(`http://localhost:3000/Player/${id}`)
            .then((response) => {
                setPlayer(response.data);
            })
            .catch((err) => {
                console.error(err);
                alert("Error fetching player data");
            });
    }, [id]);

    const handleEditPlayer = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:3000/Player/${id}`, player)
            .then((response) => {
                alert("Player Updated Successfully");
                navigate("/players"); 
            })
            .catch((err) => {
                console.error(err);
                alert("Error updating player");
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="card" style={{ width: "500px" }}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Edit Player</h3>
                    <form onSubmit={handleEditPlayer}>
                        <div className="mb-3">
                            <label className="form-label">Player Name</label>
                            <input
                                type="text"
                                value={player.playerName}
                                onChange={(e) => setPlayer({ ...player, playerName: e.target.value })}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Player Type</label>
                            <select
                                value={player.playerType}
                                onChange={(e) => setPlayer({ ...player, playerType: e.target.value })}
                                className="form-control"
                            >
                                <option value="">Select Type</option>
                                <option value="Batsman">Batsman</option>
                                <option value="Bowler">Bowler</option>
                                <option value="All-Rounder">All-Rounder</option>
                                <option value="Wkt-Keeper">Wkt-Keeper</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                value={player.email}
                                onChange={(e) => setPlayer({ ...player, email: e.target.value })}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                value={player.password}
                                onChange={(e) => setPlayer({ ...player, password: e.target.value })}
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Role ID</label>
                            <input
                                type="text"
                                value={player.roleId}
                                onChange={(e) => setPlayer({ ...player, roleId: e.target.value })}
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-success w-100">Update Player</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditPlayer;
