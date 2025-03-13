import React from "react";
import { Link } from "react-router-dom";

function PlayerNavBar() {
    return (

        <div>
            <br />
            <nav className="navbar navbar-expand-lg bg-info">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">Cricket Application</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarContent">

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/player" className="nav-link active" aria-current="page">View Players</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/changepassword" className="nav-link">Change Password</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/logout" className="nav-link">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <br />
        </div>
    );
}

export default PlayerNavBar;