import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About Cricket Application</h1>
        <p>Your one-stop solution for player search, stats, and cricket insights.</p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>What We Offer</h2>
          <p>
            This platform is designed to help cricket lovers easily explore player statistics,
            search players by name or type, and manage player information with ease.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <img src="/images/search.png" alt="Search" />
            <h3>Advanced Search</h3>
            <p>Find players by name, type (Batsman, Bowler, All-Rounder) instantly.</p>
          </div>

          <div className="feature-card">
            <img src="/images/stats.png" alt="Statistics" />
            <h3>Detailed Stats</h3>
            <p>Get in-depth insights into player profiles and performance history.</p>
          </div>

          <div className="feature-card">
            <img src="/images/user.png" alt="User Friendly" />
            <h3>User-Friendly UI</h3>
            <p>Simplified interface for seamless navigation and great user experience.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default About;
