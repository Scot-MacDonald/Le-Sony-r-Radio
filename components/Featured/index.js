// Featured.js
import { useState, useEffect } from "react";
import styles from "@/styles/featured.module.css";

const Featured = () => {
  const [featuredMixes, setFeaturedMixes] = useState([]);
  const [hoveredMix, setHoveredMix] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/mixes/featured");
        if (response.ok) {
          const mixes = await response.json();
          setFeaturedMixes(mixes);
        } else {
          console.error("Failed to fetch mixes");
        }
      } catch (error) {
        console.error("Error fetching mixes:", error);
      }
    };

    fetchData();
  }, []);

  const handleMixHover = (mix) => {
    setHoveredMix(mix);
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
            {mix.title}
          </div>
        ))}
      </div>
      <div className={styles.rightColumn}>
        {hoveredMix && (
          <div className={styles.imageContainer}>
            <img
              src={hoveredMix.imageURL}
              alt={hoveredMix.title}
              className={styles.featuredImage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Featured;
