import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DeletePlayer({ playerId }) {
    const navigate = useNavigate(); 

    const handleDeletePlayer = () => {
        console.log("Deleting player with ID:", playerId); 
        axios
            .delete(`http://localhost:3000/Player/${playerId}`)
            .then((response) => {
                console.log(response); 
                alert("Player Deleted Successfully");
                navigate("/players"); 
            })
            .catch((err) => {
                console.error(err);
                alert("Error deleting player");
            });
    };

    return (
        <div>
            <button onClick={handleDeletePlayer} className="btn btn-danger">
                Delete Player
            </button>
        </div>
    );
}

export default DeletePlayer;
