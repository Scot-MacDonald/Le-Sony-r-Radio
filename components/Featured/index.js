// Featured.js
import { useState, useEffect } from "react";
import styles from "@/styles/featured.module.css";
import Link from "next/link";

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

    fetchLatestMix();
    fetchFeaturedMixes();
  }, []);

  const handleMixHover = (mix) => {
    setHoveredMix(mix);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  };

  return (
    <div className={styles.featured}>
      <div className={styles.leftColumn}>
        {featuredMixes.map((mix) => (
          <Link key={mix._id} href={`/${mix.slug}`}>
            <div
              className={styles.row}
              onMouseEnter={() => handleMixHover(mix)}
            >
              <p className={styles.p}>{formatDate(mix.date)}</p>
              <h2>{mix.title}</h2>
            </div>
          </Link>
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
