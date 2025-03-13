import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './GenNavBar.css'; // Import the CSS for GenNavBar

function GenNavBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      // Navigate to search result page with query param
      navigate(`/searchplayername?name=${searchTerm.trim()}`);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-fixed-top bg-info">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">Cricket Application</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link to="/home" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">About</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">Contact</Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            </ul>

            {/* 🔍 Search Bar (after login link) */}
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Player"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);

                  // ✅ Clear search results if search box is emptied
                  if (value.trim() === "") {
                    navigate("/searchplayername");
                    navigate('/home');
                    // remove query param
                  }
                }}
              />
              <button className="btn btn-outline-dark" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default GenNavBar;
