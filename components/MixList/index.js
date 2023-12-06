// MixList.js
import useSWR from "swr";
import Link from "next/link";
import { useSelectedTrack } from "@/context/SelectedTrackContext";
import styles from "@/styles/mixes.module.css";
import Image from "next/image";

export default function MixList({ mixes }) {
  console.log("Received Mixes in MixList:", mixes);

  const {
    setSelectedTrack,
    selectedTrack,
    selectedTags = [],
  } = useSelectedTrack();

  const handlePlayClick = (trackUrl) => {
    const isSameTrack = trackUrl === selectedTrack;

    // If the clicked track is the same as the currently selected track, pause it
    setSelectedTrack(isSameTrack ? null : trackUrl);
  };

  if (!mixes || !Array.isArray(mixes)) {
    return <h1>No mixes available</h1>;
  }

  // Ensure data is an array before filtering
  const dataArray = mixes;

  console.log("Selected Tags:", selectedTags);
  console.log("Mix Data:", dataArray);

  // Filter mixes based on selected tags
  const filteredMixes = dataArray.filter((mix) =>
    selectedTags.every((tag) => mix.tags.includes(tag))
  );

  console.log("Filtered Mixes:", filteredMixes);

  return (
    <>
      <h2 className={styles.header}>MIXES</h2>
      <ul className={styles.mixes}>
        {filteredMixes.map((mix) => (
          <li className={styles.mix} key={mix.slug}>
            <div className={styles.mixContent}>
              <div className={styles.imageContainer}>
                <Image
                  src={mix.imageURL}
                  alt={`Image for ${mix.title}`}
                  width={312}
                  height={205}
                  className={`${styles.mixImage} ${
                    selectedTrack === mix.url ? styles.active : ""
                  }`}
                />
                {/* Centered play/stop button */}
                <div
                  className={`${styles.playButton} ${
                    selectedTrack === mix.url ? styles.active : ""
                  }`}
                  onClick={() => handlePlayClick(mix.url)}
                  onMouseEnter={() => {
                    document
                      .querySelector(`.${styles.playButton}`)
                      .classList.add(styles.active);
                  }}
                  onMouseLeave={() => {
                    if (selectedTrack !== mix.url) {
                      document
                        .querySelector(`.${styles.playButton}`)
                        .classList.remove(styles.active);
                    }
                  }}
                >
                  {selectedTrack === mix.url ? (
                    // Display stop button when the track is playing
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="4" y="4" width="16" height="16" />
                    </svg>
                  ) : (
                    // Display play button when the track is not playing
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  )}
                </div>
              </div>

              <div className={styles.mixHeader}>
                <Link href={`/${mix.slug}`}>
                  <div className={styles.mixDate}>
                    <div>{new Date(mix.date).toLocaleDateString()}</div>
                    <div>{mix.city}</div>
                  </div>
                  <div className={styles.mixTitle}>{mix.title}</div>
                </Link>
              </div>

              <div className={styles.mixTags}>
                {mix.tags
                  .flatMap((tagItem) => tagItem.split(","))
                  .map((tag, index) => (
                    <span className={styles.mixTag} key={index}>
                      <Link href={`/explore?tags=${tag.trim()}`}>
                        {tag.trim()}
                      </Link>
                    </span>
                  ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
