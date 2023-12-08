// Featured.js
import { useState, useEffect } from "react";
import styles from "@/styles/featured.module.css";

const Featured = () => {
  const [featuredMixes, setFeaturedMixes] = useState([]);
  const [latestMix, setLatestMix] = useState(null);
  const [hoveredMix, setHoveredMix] = useState(null);

  useEffect(() => {
    // Function to fetch the latest mix
    const fetchLatestMix = async () => {
      try {
        const response = await fetch("/api/featured/latest");
        if (response.ok) {
          const latestMixData = await response.json();
          setLatestMix(latestMixData);
        } else {
          console.error("Failed to fetch the latest mix");
        }
      } catch (error) {
        console.error("Error fetching the latest mix:", error);
      }
    };

    // Function to fetch all featured mixes
    const fetchFeaturedMixes = async () => {
      try {
        const response = await fetch("/api/featured");
        if (response.ok) {
          const mixes = await response.json();
          setFeaturedMixes(mixes);
        } else {
          console.error("Failed to fetch featured mixes");
        }
      } catch (error) {
        console.error("Error fetching featured mixes:", error);
      }
    };

    // Fetch the latest mix and featured mixes when the component mounts
    fetchLatestMix();
    fetchFeaturedMixes();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const handleMixHover = (mix) => {
    setHoveredMix(mix);
  };

  // Function to format the date (remove time)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US"); // Adjust the locale as needed
  };

  return (
    <div className={styles.featured}>
      <div className={styles.leftColumn}>
        {featuredMixes.map((mix) => (
          <div
            key={mix._id}
            className={styles.row}
            onMouseEnter={() => handleMixHover(mix)}
          >
            <p className={styles.p}>{formatDate(mix.date)}</p>
            <h2>{mix.title}</h2>
          </div>
        ))}
      </div>
      <div className={styles.rightColumn}>
        {hoveredMix || latestMix ? (
          <div className={styles.imageContainer}>
            <img
              src={(hoveredMix || latestMix).imageURL}
              alt={(hoveredMix || latestMix).title}
              className={styles.featuredImage}
            />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Featured;
