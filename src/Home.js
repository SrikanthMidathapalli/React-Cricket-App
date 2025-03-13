import React from "react";
import "./Home.css";

const imageSources = [
  "/images/cricket1.jpeg",
  "/images/cricket2.jpeg",
  "/images/cricket3.jpeg",
  "/images/cricket4.jpeg",
  "/images/cricket5.jpeg"
];

function Home() {
  return (
    <div className="home-page">
      <div className="image-gallery-wrapper">
        <div className="image-gallery">
          {[...imageSources, ...imageSources].map((src, index) => (
            <img key={index} src={src} alt={`Cricket ${index + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
